import { CompletionItem, CompletionItemKind, MarkdownString, SignatureHelp } from "vscode";
import { commands } from ".";
import { RockideContext } from "../context";
import execute from "./data/execute";
import { ParamInfo, ParamType } from "./types";

/**
 * TODO:
 * - Handle regex & parse location (~~~, ^^^, etc)
 * - idk why multiline doesn't work
 * - create separate context for non json files
 * - Merge signature location params
 */

/**
 * Convert ParamInfo to value
 * @param info
 * @returns
 */
function getParamValue(info: ParamInfo) {
  switch (info.type) {
    case ParamType.playerSelector:
      return ["@a", "@s", "@p", "@r"];
    case ParamType.entitySelector:
      return ["@a", "@s", "@p", "@r", "@e"];
    case ParamType.selectorWildcard:
      return ["@a", "@e", "@s", "@p", "@r", "*"];
    case ParamType.scoreboardSelector:
      return ["@a", "@e", "@s", "@p", "@r", "*", '"#var"'];
    case ParamType.string:
      return '""';
    case ParamType.number: {
      if (Array.isArray(info.value)) {
        return info.value;
      }
      return "0";
    }
    case ParamType.float:
      if (Array.isArray(info.value)) {
        return info.value;
      }
      return "0.0";
    case ParamType.location:
      return ["~", "^", "0"];
    case ParamType.executeChainedOption:
      return execute.overloads!.map((overload) => overload.params[0].value).flat();
    default:
      return info.value;
  }
}

/**
 * Convert ParamInfo to regex
 * @param info
 * @returns
 */
function getParamRegex(info: ParamInfo): RegExp {
  switch (info.type) {
    case ParamType.playerSelector:
      return /(@a|@s|@p|@r)(\[(.*?)\])?/g;
    case ParamType.entitySelector:
      return /(@a|@e|@s|@p|@r)(\[(.*?)\])?/g;
    case ParamType.selectorWildcard:
      return /(((@a|@e|@s|@p|@r)(\[(.*?)\])?)|\*)/g;
    case ParamType.scoreboardSelector:
      return /(((@a|@e|@s|@p|@r)(\[(.*?)\])?)|\*|("[^"]*"))/g;
    case ParamType.string:
      return /("[^"]*"|\w+)/g;
    case ParamType.number:
      return /\d+/g;
    case ParamType.location:
      return /((~|\^|\d+)\.?)/g;
    case ParamType.itemNBT:
      return /{[^]*?}/g;
    default: {
      if (Array.isArray(info.value)) {
        return new RegExp(`\\b${info.value.join("|")}\\b`, "g");
      }
      return new RegExp(`\\b${info.value}\\b`, "g");
    }
  }
}

type CompletionOpts = {
  skipCurly?: boolean;
  isInQuote?: boolean;
};

/**
 * Convert ParamInfo to CompletionItem
 * @param info
 * @returns
 */
function getParamCompletion(info: ParamInfo, opts?: CompletionOpts): CompletionItem | CompletionItem[] {
  const getKind = (type: ParamType) => {
    switch (type) {
      case ParamType.keyword:
        return CompletionItemKind.Keyword;
      case ParamType.entitySelector:
      case ParamType.playerSelector:
      case ParamType.selectorWildcard:
        return CompletionItemKind.TypeParameter;
      case ParamType.tag:
        return CompletionItemKind.EnumMember;
      case ParamType.string:
        return CompletionItemKind.Value;
      case ParamType.number:
      case ParamType.float:
      case ParamType.yaw:
      case ParamType.pitch:
      case ParamType.vector3:
      case ParamType.location:
        return CompletionItemKind.Value;
      default:
        return CompletionItemKind.Keyword;
    }
  };
  const getDocs = (type: ParamType, value: string) => {
    switch (type) {
      case ParamType.playerSelector:
      case ParamType.selectorWildcard:
      case ParamType.scoreboardSelector:
        {
          if (value.startsWith('"')) {
            return "Player name or fake player.";
          }
          switch (value) {
            case "@a":
              return "All players.";
            case "@e":
              return "All entities.";
            case "@s":
              return "The entity running the command.";
            case "@p":
              return "The nearest player.";
            case "@r":
              return "A random player.";
            case "*":
              return "All players/entities.";
          }
        }
        break;
      default:
        return;
    }
  };
  const label = getParamValue(info);
  const createCompletionItem = (value: string[] | string) => {
    if (Array.isArray(value)) {
      return value.map((v, i) => {
        let documentation = getDocs(info.type, v) ?? info.documentation;
        if (Array.isArray(documentation)) {
          documentation = documentation[i];
        }
        if (opts?.skipCurly) {
          v = v.slice(1, v.length - 1);
        }
        const completion = new CompletionItem(v, getKind(info.type));
        completion.documentation = documentation;
        if (info.type === ParamType.number) {
          completion.sortText = v.length + v;
        }
        return completion;
      });
    }
    let documentation = getDocs(info.type, value) ?? info.documentation;
    const completion = new CompletionItem(value, getKind(info.type));
    if (Array.isArray(documentation)) {
      documentation = documentation[0];
    } else {
      completion.documentation = documentation;
    }
    return completion;
  };

  return createCompletionItem(label);
}

export function commandCompletion(ctx: RockideContext, overLine?: string): CompletionItem[] {
  const { document, position } = ctx;
  const line = overLine ?? document.lineAt(position.line).text;
  if (overLine) {
    console.log("overLine", overLine);
  }
  for (const { command, overloads } of commands) {
    if (line.startsWith("#")) {
      return [];
    }
    const match = line.match(new RegExp(`^${command}\\b`));
    if (match) {
      if (!overloads) {
        return [];
      }
      // const [, ...args] = line
      //   .split(/\b\s+/g)
      //   .map((arg) => {
      //     const ok = new RegExp(/((~|\^)-?(\d+)?())/g).test(arg);
      //     if (!ok) {
      //       return arg;
      //     }
      //     return arg.match(/((~|\^)-?(\d+)?(\.\d+)?)/g) || [];
      //   })
      //   .flat();
      const [, ...args] = line
        .split(/(\b|(?<="))\s+/g)
        .filter((_, i) => i % 2 === 0)
        .map((arg) => {
          const ok = new RegExp(/((~|\^)-?(\d+)?())/g).test(arg);
          if (!ok) {
            return arg;
          }
          return arg.match(/((~|\^)-?(\d+)?(\.\d+)?)/g) || [];
        })
        .flat();
      console.log(args);
      if (args.length === 1) {
        return overloads
          .map((overload) => getParamCompletion(overload.params[0]))
          .flat()
          .filter((v, i, s) => s.findIndex((obj) => obj.label === v.label) === i);
      }
      let tempOverloads = [...overloads];
      let executeIndex = 0;
      let runIndex = 0;
      let skipCurly = false;
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        // Reset tempOverloads for exeucte index
        if (executeIndex !== 0 && i === executeIndex + 1) {
          tempOverloads = tempOverloads.filter((overload) =>
            getParamRegex(overload.params[i - executeIndex - 1]).test(args[i - 1]),
          );
        }
        tempOverloads = tempOverloads.filter((overload) => {
          try {
            if (runIndex !== 0 || executeIndex !== 0) {
              return true;
            }
            const param = overload.params[i - executeIndex];
            // run subcommand check
            if (param.type === ParamType.subcommand) {
              runIndex = i;
              return true;
            }
            // execute check
            if (param.type === ParamType.executeChainedOption) {
              executeIndex = i;
              return true;
            }
            if (!param) {
              return false;
            }
            if (param.type === ParamType.itemNBT && arg.startsWith("{") && arg.endsWith("}")) {
              skipCurly = true;
              return true;
            }
            const regex = getParamRegex(param);
            if (i === args.length - 1) {
              return !regex.test(arg);
            }
            return regex.test(arg);
          } catch (e) {
            console.error(e);
          }
        });
        if (executeIndex !== 0 && i === executeIndex) {
          tempOverloads = [...overloads];
        }
        if (runIndex !== 0 && i === runIndex) {
          const line = args.slice(runIndex).join(" ");
          return commandCompletion(ctx, line);
        }
      }
      if (runIndex !== 0) {
        const line = args.slice(runIndex).join(" ");
        return commandCompletion(ctx, line);
      }
      const completions = tempOverloads
        .map((overload) =>
          getParamCompletion(overload.params[args.length - 1 - executeIndex], {
            skipCurly,
          }),
        )
        .flat()
        .filter((v, i, s) => s.findIndex((obj) => obj.label === v.label) === i);
      return completions;
    }
  }
  return commands.map(({ command, documentation }) => {
    const completion = new CompletionItem(command, CompletionItemKind.Class);
    const markdown = new MarkdownString(`## ${command}\n\n${documentation}`);
    completion.documentation = markdown;
    return completion;
  });
}

export function signatureHelper(ctx: RockideContext, overLine?: string): SignatureHelp | undefined {
  const { document, position } = ctx;
  const line = overLine ?? document.lineAt(position.line).text;
  const signature: SignatureHelp = new SignatureHelp();

  for (const { command, overloads, documentation } of commands) {
    if (line.startsWith("#")) {
      return;
    }
    const match = line.match(new RegExp(`^${command}\\b`));
    if (match) {
      if (!overloads) {
        signature.activeSignature = 0;
        signature.activeParameter = 0;
        signature.signatures = [
          {
            label: command,
            documentation,
            parameters: [],
          },
        ];
        return signature;
      }
      const [, ...args] = line
        .split(/(\b|(?<="))\s+/g)
        .filter((_, i) => i % 2 === 0)
        .map((arg) => {
          const ok = new RegExp(/((~|\^)-?(\d+)?())/g).test(arg);
          if (!ok) {
            return arg;
          }
          return arg.match(/((~|\^)-?(\d+)?(\.\d+)?)/g) || [];
        })
        .flat();
      let tempOverloads = [...overloads];
      let executeIndex = 0;
      let runIndex = 0;
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        // Reset tempOverloads for exeucte index
        if (executeIndex !== 0 && i === executeIndex + 1) {
          tempOverloads = tempOverloads.filter((overload) =>
            getParamRegex(overload.params[i - executeIndex - 1]).test(args[i - 1]),
          );
        }
        tempOverloads = tempOverloads.filter((overload) => {
          try {
            if (runIndex !== 0 || executeIndex !== 0) {
              return true;
            }
            const param = overload.params[i - executeIndex];
            if (!param) {
              return false;
            }
            // execute check
            // run subcommand check
            if (param.type === ParamType.subcommand) {
              runIndex = i;
              return true;
            }
            if (param.type === ParamType.executeChainedOption) {
              executeIndex = i;
              return true;
            }
            if (!param) {
              return false;
            }
            const regex = getParamRegex(param);
            if (i === args.length - 1) {
              return !regex.test(arg);
            }
            return regex.test(arg);
          } catch (e) {
            console.error(e);
          }
        });
        if (executeIndex !== 0 && i === executeIndex) {
          tempOverloads = [...overloads];
        }
        if (runIndex !== 0 && i === runIndex) {
          const line = args.slice(runIndex).join(" ");
          return signatureHelper(ctx, line);
        }
      }
      const sigs = tempOverloads.map((overload) => {
        const params = overload.params.map((param) => {
          let label = param.signatureValue ?? param.value;
          if (Array.isArray(label)) {
            label = label.join("|");
          }
          return {
            label,
            documentation: param.documentation,
          };
        });

        return {
          label: `${command} ${params.map((param) => param.label).join(" ")}`,
          documentation,
          parameters: params.map(({ documentation, label }) => {
            const docs = Array.isArray(documentation) ? documentation.join("|") : documentation;
            return {
              label,
              documentation: docs,
            };
          }),
        };
      });
      signature.activeSignature = 0;
      signature.activeParameter = args.length - 1 - executeIndex;
      signature.signatures = sigs;
      return signature;
    }
  }
  return;
}
