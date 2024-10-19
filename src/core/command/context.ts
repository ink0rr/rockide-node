import * as vscode from "vscode";
import { commands } from "./data";
import execute from "./data/execute";
import { CommandInfo, CommandSignature, ParamInfo, ParamType } from "./types";

export function createOldCommandContext(document: vscode.TextDocument, position: vscode.Position) {
  // const range = document.getWordRangeAtPosition(position, /\/\w+/);
  let currentText: string;
  const getCurrentText = () => {
    if (currentText) {
      return currentText;
    }
    currentText = document.lineAt(position.line).text.slice(0, position.character);
    return currentText;
  };
  /**
   * Convert ParamInfo to regex
   * @param info
   * @returns
   */
  function getParamRegex(info: ParamInfo): RegExp {
    switch (info.type) {
      case ParamType.playerSelector:
        return /@[aprs](\[(.*?)\])?/g;
      case ParamType.entitySelector:
        return /@[aeprs](\[(.*?)\])?/g;
      case ParamType.selectorWildcard:
        return /((@[aeprs](\[(.*?)\])?)|\*)/g;
      case ParamType.scoreboardSelector:
        return /((@[aeprs](\[(.*?)\])?)|\*|("[^"]*"))/g;
      case ParamType.string:
        return /("[^"]*"|\w+)/g;
      case ParamType.number:
        return /\d+/g;
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
      case ParamType.RockideMcfunction:
        return /[\/"\w]+/g;
      default: {
        if (Array.isArray(info.value)) {
          return new RegExp(`\\b${info.value.join("|")}\\b`, "g");
        }
        return new RegExp(`\\b${info.value}\\b`, "g");
      }
    }
  }
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
      default:
        return info.value;
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
  function getParamCompletion(info: ParamInfo, opts?: CompletionOpts): vscode.CompletionItem | vscode.CompletionItem[] {
    const getKind = (type: ParamType) => {
      switch (type) {
        case ParamType.keyword:
          return vscode.CompletionItemKind.Keyword;
        case ParamType.entitySelector:
        case ParamType.playerSelector:
        case ParamType.selectorWildcard:
          return vscode.CompletionItemKind.TypeParameter;
        case ParamType.tag:
          return vscode.CompletionItemKind.EnumMember;
        case ParamType.string:
          return vscode.CompletionItemKind.Value;
        case ParamType.number:
        case ParamType.float:
        case ParamType.yaw:
        case ParamType.pitch:
        case ParamType.vector3:
        case ParamType.location:
          return vscode.CompletionItemKind.Value;
        default:
          return vscode.CompletionItemKind.Keyword;
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
          const completion = new vscode.CompletionItem(v, getKind(info.type));
          completion.documentation = documentation;
          if (info.type === ParamType.number) {
            completion.sortText = v.length + v;
          }
          return completion;
        });
      }
      let documentation = getDocs(info.type, value) ?? info.documentation;
      const completion = new vscode.CompletionItem(value, getKind(info.type));
      if (Array.isArray(documentation)) {
        documentation = documentation[0];
      } else {
        completion.documentation = documentation;
      }
      return completion;
    };

    return createCompletionItem(label);
  }
  const parseParam = (overloads: CommandSignature[], args: string[]) => {
    const retVal: string[] = [];
    for (const overload of overloads) {
      const { params } = overload;
      let k = 0;
      let temp: string[] = [];
      for (let j = 0; j < params.length; j++) {
        const arg = args[k];
        if (!arg) {
          break;
        }
        const param = params[j];
        if (param.type === ParamType.executeChainedOption) {
          const { k: kk, retVal: r } = parseParam(overloads, args.slice(k));
          if (r.length) {
            temp.push(...r);
            k += kk;
          }
          break;
        }
        // idiot solution
        // todo: proper solution
        if (Array.isArray(param.value) && param.value[0] === "run" && arg === "run") {
          temp.push(arg);
          k++;
          break;
        }
        const regex = getParamRegex(param);
        const match = regex.exec(arg);
        if (!match) {
          temp = [];
          break;
        }
        temp.push(arg);
        k++;
      }
      if (temp.length) {
        retVal.push(...temp);
        return { k, retVal };
      }
    }
    return { k: 0, retVal: [] };
  };

  type CommandSequence = {
    command: string;
    args: Array<ParamInfo>;
  };
  return {
    document,
    position,
    text: getCurrentText(),
    getCurrentWord() {
      // const range = document.getWordRangeAtPosition(position, /"([^"]*)"|\S+/);
      const range = document.getWordRangeAtPosition(position, /\b\w+\b|\"[^\"]+\"|\b[\d\.]+\b|[~^*]/);
      if (!range) {
        return;
      }
      return {
        text: document.getText(range),
        range,
      };
    },
    getParamCompletion,
    getSelector() {
      const range = document.getWordRangeAtPosition(position, /(@\w+)\s*(\[(.*?)\])?/);
      if (!range) {
        return;
      }
      const selector = document.getText(range);
      const exec = selector.match(/\[(.*?)\]/);
      if (!exec) {
        return;
      }
      const data = exec[1].split(",");
      const dataRange = document.getWordRangeAtPosition(position, /\w+=(.+?(?=[,\]]))?/);
      let currentData: string | undefined;
      if (dataRange) {
        currentData = document.getText(dataRange);
      }
      return {
        selector,
        data,
        currentData: {
          data: currentData,
          param: currentData?.split("=")[0],
          value: currentData?.split("=")[1] || undefined,
        },
      };
    },
    isCommment() {
      return getCurrentText().startsWith("#");
    },
    getCommands() {
      const text = getCurrentText();
      if (!text) {
        return [];
      }
      const [...words] = text
        .split(/(\b|(?<=([~^"*])))\s+/g)
        .filter((_, i) => i % 3 === 0)
        .map((arg) => {
          return new RegExp(/((~|\^)-?(\d+)?(\.\d+)?)/g).test(arg) ? arg.match(/((~|\^)-?(\d+)?(\.\d+)?)/g) || [] : arg;
        })
        .flat();
      const result: string[][] = [];
      let i = 0;
      while (true) {
        const word = words[i];
        if (!word) {
          break;
        }
        const command = commands.find(({ command }) => command === word);
        if (!command) {
          break;
        }
        const { overloads, command: c } = command;
        result.push([c]);
        const cmd = result[result.length - 1];
        i++;
        if (!overloads) {
          continue;
        }
        const arg = words[i];
        if (!arg) {
          break;
        }
        // for (const overload of overloads) {
        // const { params } = overload;
        // let k = i;
        // let temp: string[] = [];
        // for (let j = 0; j < params.length; j++) {
        //   const arg = words[k];
        //   if (!arg) {
        //     break;
        //   }
        //   const param = params[j];
        //   if (param.type === ParamType.executeChainedOption) {
        //     temp.push(arg);
        //     break;
        //   }
        //   const regex = getParamRegex(param);
        //   const match = regex.exec(arg);
        //   if (!match) {
        //     temp = [];
        //     break;
        //   }
        //   temp.push(arg);
        //   k++;
        // }
        // if (temp.length) {
        //   cmd.push(...temp);
        //   i = k;
        //   break;
        // }
        // cmd.push(...parseParam(params, words.slice(i)));
        // }
        try {
          const { k, retVal } = parseParam(overloads, words.slice(i));
          cmd.push(...retVal);
          i += k;
        } catch (e) {
          console.error(e);
        }
      }
      return result;
    },
    getCommandsV2(): Array<CommandSequence> {
      const result: CommandSequence[] = [];
      const text = getCurrentText();
      if (!text) {
        return result;
      }
      let [...words] = text
        .split(/(\b|(?<=([~^"*])))\s+/g)
        .filter((_, i) => i % 3 === 0)
        .map((arg) => {
          return new RegExp(/((~|\^)-?(\d+)?(\.\d+)?)/g).test(arg) ? arg.match(/((~|\^)-?(\d+)?(\.\d+)?)/g) || [] : arg;
        })
        .flat();
      while (words.length) {
        const word = words.shift();
        const command = commands.find(({ command }) => command === word);
        if (!command) {
          break;
        }
        const { overloads, command: c } = command;
        const args: ParamInfo[] = [];
        result.push({ command: c, args });
        if (!overloads) {
          break;
        }
        for (const overload of overloads) {
          const { params } = overload;
          let k = 0;
          let temp: ParamInfo[] = [];
          for (let i = 0; i < params.length; i++) {
            const arg = words[k];
            if (!arg) {
              break;
            }
            const param = params[i];
            const regex = getParamRegex(param);
            const match = regex.exec(arg);
            if (!match) {
              temp = [];
              break;
            }
            temp.push(param);
            k++;
          }
          if (temp.length) {
            args.push(...temp);
            words = words.slice(k);
          }
        }
      }
      return result;
    },
    createCompletion(value: string | vscode.CompletionItem) {
      const completion =
        typeof value === "string" ? new vscode.CompletionItem(value, vscode.CompletionItemKind.Function) : value;
      completion.range = document.getWordRangeAtPosition(position, /\b\w+/);
      if (typeof value === "string") {
        completion.insertText = value;
      }
      return completion;
    },
    getCompletionFromCommand(command: CommandInfo, args: string[]) {
      const { overloads } = command;
      if (!overloads) {
        return [];
      }
      let tempOverloads = [...overloads];
      let executeIndex = 0;
      let runIndex = 0;
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        tempOverloads = tempOverloads.filter((overload) => {
          const param = overload.params[i - executeIndex];
          const nextIndex = i + 1 - executeIndex;
          const nextParam = overload.params[nextIndex];
          if (!param) {
            return false;
          }
          const regex = getParamRegex(param);
          const ok = regex.test(arg);
          // run subcommand check
          if (nextParam?.type === ParamType.subcommand && ok) {
            runIndex = i + 1;
            return true;
          }
          // execute check
          if (nextParam?.type === ParamType.executeChainedOption && ok) {
            executeIndex = i + 1;
            return true;
          }
          // runindex
          if (runIndex !== 0) {
            return true;
          }
          // todo: json check
          return ok;
        });

        if (executeIndex !== 0 && i + 1 === executeIndex) {
          // tempOverloads = [...overloads].filter((overload) => {
          //   const param = overload.params[0];
          //   return getParamRegex(param).test(args[i]);
          // });
          tempOverloads = [...overloads];
        }
        if (runIndex !== 0 && i + 1 === runIndex) {
          return commands.map(({ command, documentation }) => {
            const completion = new vscode.CompletionItem(command, vscode.CompletionItemKind.Class);
            const markdown = new vscode.MarkdownString(`## ${command}\n\n${documentation}`);
            completion.documentation = markdown;
            return completion;
          });
        }
      }
      return tempOverloads
        .map(({ params }) => getParamCompletion(params[args.length - executeIndex]))
        .flat()
        .filter((v, i, s) => i === s.findIndex((obj) => obj.label === v.label));
      // return tempOverloads;
    },
    async createDefinition(path: string, originSelectionRange: vscode.Range): Promise<vscode.LocationLink> {
      const targetDocument = await vscode.workspace.openTextDocument(path);
      const targetRange = new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(
          targetDocument.lineCount - 1,
          targetDocument.lineAt(targetDocument.lineCount - 1).text.length,
        ),
      );
      const targetUri = targetDocument.uri;
      return {
        originSelectionRange,
        targetRange,
        targetUri,
      };
    },
  };
}

export type OldCommandContext = NonNullable<ReturnType<typeof createOldCommandContext>>;
