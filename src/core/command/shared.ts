import { CompletionItem, CompletionItemKind, MarkdownString, SignatureHelp } from "vscode";
import { Rockide } from "../../rockide";
import { OldCommandContext } from "./context";
import { commands } from "./data";
import execute from "./data/execute";
import { ParamInfo, ParamType } from "./types";

/**
 * TODO:
 * - Handle regex & parse location (~~~, ^^^, etc)
 * - idk why multiline doesn't work
 * - create separate context for non json files
 * - Merge signature location params
 * - inside quote for jsons (itemnbt, rawjsonmessage)
 */

/**
 * Convert ParamInfo to value
 * @param info
 * @returns
 */
function getParamValue(info: ParamInfo, rockide: Rockide) {
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
      if (Array.isArray(info.value)) {
        return info.value;
      }
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
    case ParamType.yaw:
      return ["0.0", "-90.0", "90.0", "-180.0"];
    case ParamType.pitch:
      return ["0.0", "-90.0", "90.0"];
    case ParamType.executeChainedOption:
      return execute.overloads!.map((overload) => overload.params[0].value).flat();
    // rockide specific
    case ParamType.RockideLootTable:
      return rockide
        .getLootTables()
        .map(({ bedrockPath }) => (bedrockPath.endsWith(".json") ? bedrockPath.slice(0, -5) : bedrockPath));
    case ParamType.RockideParticle:
      return rockide.getParticles().map(({ values }) => values[0]);
    case ParamType.RockideClientAnimation:
      return rockide
        .getClientAnimations()
        .map(({ values }) => values)
        .flat();
    case ParamType.RockideMcfunction: {
      return Array.from(rockide.mcfunctions.keys()).map((key) => key.split("functions/")[1].split(".")[0]);
    }
    case ParamType.RockideMcstructure:
      return Array.from(rockide.structures.keys()).map((key) => `"${key.split("structures/")[1].split(".")[0]}"`);
    case ParamType.RockideTag:
      return rockide.tags.values().concat('""');
    default:
      return info.value;
  }
}

/**
 * Convert ParamInfo to regex
 * @param info
 * @returns
 */
function getParamRegex(info: ParamInfo, rockide: Rockide): RegExp {
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
      return /-?\d+/g;
    case ParamType.float:
      return /-?\d+(\.\d+)?/g;
    case ParamType.yaw:
      return /-?(180|1[0-7][0-9]|[1-9]?[0-9])/g;
    case ParamType.pitch:
      return /-?(90|[1-8]?[0-9])/g;
    case ParamType.location:
      return /((~|\^|\d+)\.?)/g;
    case ParamType.xpLevel:
      return /-?(\d+)L?/g;
    case ParamType.itemNBT:
    case ParamType.rawJsonMessage:
      return /{[^]*?}/g;
    // rockide specific
    case ParamType.RockideLootTable:
    case ParamType.RockideParticle: {
      const value = getParamValue(info, rockide);
      if (Array.isArray(value)) {
        return new RegExp(`\\b${value.join("|")}\\b`, "g");
      }
      return new RegExp(`\\b${value}\\b`, "g");
    }
    case ParamType.RockideClientAnimation:
      return /("[^"]*"|[\w.]+)/g;
    case ParamType.RockideMcfunction:
      return /\b\w+\b|\"[^\"]+\"/g;
    case ParamType.RockideMcstructure:
      return /\b\w+:\w+\b|\"[^\"]+\"/g;
    case ParamType.RockideTag:
      return /\w+|"[^"]*"/g;
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
function getParamCompletion(
  info: ParamInfo,
  rockide: Rockide,
  opts?: CompletionOpts,
): CompletionItem | CompletionItem[] {
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
  const label = getParamValue(info, rockide);
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
        if (v.includes(" ")) {
          v = `"${v}"`;
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
    if (opts?.skipCurly) {
      value = value.slice(1, value.length - 1);
    }
    if (value.includes(" ")) {
      value = `"${value}"`;
    }
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

function selectorCompletion(): CompletionItem[] {
  const data = [
    { name: "x", insertText: "x", documentation: "X coordinate." },
    { name: "y", insertText: "y", documentation: "Y coordinate." },
    { name: "z", insertText: "z", documentation: "Z coordinate." },
    { name: "c", insertText: "c", documentation: "Count." },
    { name: "dx", insertText: "dx", documentation: "X range." },
    { name: "dy", insertText: "dy", documentation: "Y range." },
    { name: "dz", insertText: "dz", documentation: "Z range." },
    { name: "family", insertText: "family", documentation: "Family." },
    { name: "has_property", insertText: "has_property", documentation: "Has property." },
    { name: "has_item", insertText: "has_item", documentation: "Has item." },
    { name: "l", insertText: "l", documentation: "Level." },
    { name: "lm", insertText: "lm", documentation: "Level minimum." },
    { name: "m", insertText: "m", documentation: "Gamemode." },
    { name: "name", insertText: "name", documentation: "Name." },
    { name: "r", insertText: "r", documentation: "Range." },
    { name: "rm", insertText: "rm", documentation: "Range minimum." },
    { name: "rxm", insertText: "rxm", documentation: "Rotation X minimum." },
    { name: "rx", insertText: "rx", documentation: "Rotation X." },
    { name: "rym", insertText: "rym", documentation: "Rotation Y minimum." },
    { name: "ry", insertText: "ry", documentation: "Rotation Y." },
    { name: "scores", insertText: "scores", documentation: "Scores." },
    { name: "tag", insertText: "tag", documentation: "Tag." },
    { name: "type", insertText: "type", documentation: "Entity typeid." },
  ];
  return data.map(({ name, insertText, documentation }) => {
    const completion = new CompletionItem(name, CompletionItemKind.TypeParameter);
    completion.documentation = documentation;
    completion.insertText = insertText;
    return completion;
  });
}

function selectorDataCompletion(param: string, rockide: Rockide): CompletionItem[] {
  // todo: get family from rockide
  rockide;
  const data = [
    { param: "x", name: "1", insertText: "1" },
    { param: "x", name: "-1", insertText: "-1" },
    { param: "x", name: "~1", insertText: "~1" },
    { param: "x", name: "~-1", insertText: "~-1" },
    { param: "y", name: "1", insertText: "1" },
    { param: "y", name: "-1", insertText: "-1" },
    { param: "y", name: "~1", insertText: "~1" },
    { param: "y", name: "~-1", insertText: "~-1" },
    { param: "z", name: "1", insertText: "1" },
    { param: "z", name: "-1", insertText: "-1" },
    { param: "z", name: "~1", insertText: "~1" },
    { param: "z", name: "~-1", insertText: "~-1" },
    { param: "c", name: "1", insertText: "1" },
    { param: "c", name: "2", insertText: "2" },
    { param: "dx", name: "5", insertText: "5" },
    { param: "dx", name: "10", insertText: "10" },
    { param: "dy", name: "5", insertText: "5" },
    { param: "dy", name: "10", insertText: "10" },
    { param: "dz", name: "5", insertText: "5" },
    { param: "dz", name: "10", insertText: "10" },
    { param: "family", name: "player", insertText: "player" },
    { param: "family", name: "!player", insertText: "!player" },
    // todo: has property
    { param: "has_property", name: "minecraft:armadillo_state", insertText: "minecraft:armadillo_state" },
    // todo: has item
    { param: "has_item", name: "{}", insertText: "{}" },
    { param: "has_item", name: "[]", insertText: "[]" },
    { param: "l", name: "1", insertText: "1" },
    { param: "l", name: "5", insertText: "5" },
    { param: "lm", name: "1", insertText: "1" },
    { param: "lm", name: "5", insertText: "5" },
    { param: "m", name: "spectator", insertText: "spectator" },
    { param: "m", name: "creative", insertText: "creative" },
    { param: "m", name: "adventure", insertText: "adventure" },
    { param: "m", name: "survival", insertText: "survival" },
    { param: "m", name: "0", insertText: "0" },
    { param: "m", name: "1", insertText: "1" },
    { param: "m", name: "2", insertText: "2" },
    { param: "name", name: "playerName", insertText: "playerName" },
    { param: "r", name: "5", insertText: "5" },
    { param: "rm", name: "5", insertText: "5" },
    { param: "rx", name: "90", insertText: "90" },
    { param: "rxm", name: "0", insertText: "0" },
    { param: "rxm", name: "-90", insertText: "-90" },
    { param: "rxm", name: "90", insertText: "90" },
    { param: "ry", name: "0", insertText: "0" },
    { param: "ry", name: "-90", insertText: "-90" },
    { param: "ry", name: "90", insertText: "90" },
    { param: "ry", name: "-180", insertText: "180" },
    { param: "rym", name: "0", insertText: "0" },
    { param: "rym", name: "-90", insertText: "-90" },
    { param: "rym", name: "90", insertText: "90" },
    { param: "rym", name: "-180", insertText: "180" },
    // todo: scores
    { param: "scores", name: "{}", insertText: "{}" },
    { param: "scores", name: "{objName=1}", insertText: "{objName=1}" },
    { param: "scores", name: "{objName=1..10}", insertText: "{objName=1..10}" },
    // todo: tag
    { param: "tag", name: "tag1", insertText: "tag1" },
    { param: "tag", name: "!tag1", insertText: "!tag1" },
    // todo: identifier
    { param: "type", name: "minecraft:player", insertText: "minecraft:player" },
    { param: "type", name: "minecraft:cow", insertText: "minecraft:cow" },
    { param: "type", name: "!minecraft:player", insertText: "!minecraft:player" },
    { param: "type", name: "!minecraft:cow", insertText: "!minecraft:cow" },
  ];
  return data
    .filter(({ param: p }) => p === param)
    .map(({ name, insertText }) => {
      const completion = new CompletionItem(name, CompletionItemKind.Enum);
      completion.insertText = insertText;
      return completion;
    });
}

export function commandCompletion(ctx: OldCommandContext, rockide: Rockide, overLine?: string): CompletionItem[] {
  const { document, position } = ctx;
  const selector = ctx.getSelector();
  if (selector) {
    console.log(selector.currentData);
    if (!selector.currentData.value && selector.currentData.param) {
      return selectorDataCompletion(selector.currentData.param, rockide);
    }
    return selectorCompletion();
  }
  const line = overLine ?? document.lineAt(position.line).text;
  for (const { command, overloads } of commands) {
    if (line.startsWith("#")) {
      return [];
    }
    const match = line.match(new RegExp(`^${command}\\b`));
    if (match) {
      if (!overloads) {
        return [];
      }
      const [, ...args] = line
        .split(/(\b|(?<=([~^"*\]])))\s+/g)
        .filter((_, i) => i % 3 === 0)
        .map((arg, i, self) => {
          const isSelector = /\[(.*?)\]/g.test(arg);
          if (isSelector && /(@\w+)/g.test(self[i - 1])) {
            return undefined;
          }
          const isPosition = /((~|\^)-?(\d+)?())/g.test(arg);
          if (!isPosition) {
            return arg;
          }
          return arg.match(/((~|\^)-?(\d+)?(\.\d+)?)/g) || [];
        })
        .flat()
        .filter((arg) => arg !== undefined);
      // console.log(args);
      if (args.length === 1) {
        return overloads
          .map((overload) => getParamCompletion(overload.params[0], rockide))
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
            getParamRegex(overload.params[i - executeIndex - 1], rockide).test(args[i - 1]),
          );
        }
        tempOverloads = tempOverloads.filter((overload) => {
          try {
            const param = overload.params[i - executeIndex];
            if (!param) {
              return false;
            }
            // run subcommand check
            if (param?.type === ParamType.subcommand) {
              runIndex = i;
              return true;
            }
            // execute check
            if (param.type === ParamType.executeChainedOption) {
              executeIndex = i;
              return true;
            }
            if (
              [ParamType.itemNBT, ParamType.rawJsonMessage].includes(param.type) &&
              arg.startsWith("{") &&
              arg.endsWith("}")
            ) {
              if (param.type === ParamType.itemNBT) {
                skipCurly = true;
              }
              return true;
            }
            if (runIndex !== 0) {
              return true;
            }
            const regex = getParamRegex(param, rockide);
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
          return commandCompletion(ctx, rockide, line);
        }
      }
      // console.log(tempOverloads);
      if (runIndex !== 0) {
        const line = args.slice(runIndex).join(" ");
        return commandCompletion(ctx, rockide, line);
      }
      const completions = tempOverloads
        .map((overload) =>
          getParamCompletion(overload.params[args.length - 1 - executeIndex], rockide, {
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

export function signatureHelper(
  ctx: OldCommandContext,
  rockide: Rockide,
  overLine?: string,
): SignatureHelp | undefined {
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
        .split(/(\b|(?<=([~^"*\]])))\s+/g)
        .filter((_, i) => i % 3 === 0)
        .map((arg, i, self) => {
          const isSelector = /\[(.*?)\]/g.test(arg);
          if (isSelector && /(@\w+)/g.test(self[i - 1])) {
            return undefined;
          }
          const isPosition = /((~|\^)-?(\d+)?())/g.test(arg);
          if (!isPosition) {
            return arg;
          }
          return arg.match(/((~|\^)-?(\d+)?(\.\d+)?)/g) || [];
        })
        .flat()
        .filter((arg) => arg !== undefined);
      let tempOverloads = [...overloads];
      let executeIndex = 0;
      let runIndex = 0;
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        // Reset tempOverloads for exeucte index
        if (executeIndex !== 0 && i === executeIndex + 1) {
          tempOverloads = tempOverloads.filter((overload) =>
            getParamRegex(overload.params[i - executeIndex - 1], rockide).test(args[i - 1]),
          );
        }
        tempOverloads = tempOverloads.filter((overload) => {
          try {
            const param = overload.params[i - executeIndex];
            if (!param) {
              return false;
            }
            // run subcommand check
            if (param?.type === ParamType.subcommand) {
              runIndex = i;
              return true;
            }
            // execute check
            if (param.type === ParamType.executeChainedOption) {
              executeIndex = i;
              return true;
            }
            if (
              [ParamType.itemNBT, ParamType.rawJsonMessage].includes(param.type) &&
              arg.startsWith("{") &&
              arg.endsWith("}")
            ) {
              return true;
            }
            if (runIndex !== 0) {
              return true;
            }
            const regex = getParamRegex(param, rockide);
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
          return signatureHelper(ctx, rockide, line);
        }
      }
      const sigs = tempOverloads.map((overload) => {
        const params = overload.params.map((param) => {
          let label = param.signatureValue ?? param.value;
          if (Array.isArray(label)) {
            label = "";
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
