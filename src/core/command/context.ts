import * as vscode from "vscode";
import { blockIdentifier } from "../../literals/block_identifier";
import { Rockide } from "../../rockide";
import { commands } from "./data";
import execute from "./data/execute";
import { ParamInfo, ParamType } from "./types";

export function createCommandContext(rockide: Rockide, document: vscode.TextDocument, position: vscode.Position) {
  let currentText: string;
  const getCurrentText = () => {
    if (currentText) {
      return currentText;
    }
    currentText = document.lineAt(position.line).text.slice(0, position.character);
    return currentText;
  };
  const getCurrentWord = () => {
    const range = document.getWordRangeAtPosition(position, /"[^"]*"|{.*?}|\[.*?\]|\S+/);
    if (!range) {
      return;
    }
    return {
      text: document.getText(range),
      range,
    };
  };
  /**
   * Convert ParamInfo to value
   * @param info
   * @returns
   */
  function getParamValue(rockide: Rockide, info: ParamInfo) {
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
      case ParamType.range:
        return ["0..10", "0..", "..10", "0", "10"];
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
      case ParamType.scoreboardOperation:
        return ["%=", "*=", "+=", "-=", "/=", "<", "=", ">", "><"];
      case ParamType.itemNBT:
        const word = getCurrentWord();
        if (!word) {
          return info.value;
        }
        if (word.text.startsWith("{") && word.text.endsWith("}")) {
          if (Array.isArray(info.value)) {
            return info.value.map((v) => v.slice(1, -1));
          }
          return info.value.slice(1, -1);
        }
        return info.value;
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
      case ParamType.RockideScoreboardObjective:
        return rockide.objectives.values().concat('""', "objectiveName");
      case ParamType.RockideBlock:
        return blockIdentifier;
      case ParamType.RockideTickingarea:
        return rockide.tickingareas.values();
      default:
        return info.value;
    }
  }
  function testParam(str: string, rockide: Rockide, info: ParamInfo): boolean {
    const { type, value } = info;
    switch (type) {
      case ParamType.playerSelector:
        return /(@a|@s|@p|@r)(\[(.*?)\])?/g.test(str);
      case ParamType.entitySelector:
        return /(@a|@e|@s|@p|@r)(\[(.*?)\])?/.test(str);
      case ParamType.selectorWildcard:
        return /(((@a|@e|@s|@p|@r)(\[(.*?)\])?)|\*)/.test(str);
      case ParamType.scoreboardSelector:
        return /(((@a|@e|@s|@p|@r)(\[(.*?)\])?)|\*|("[^"]*"))/.test(str);
      case ParamType.string:
        return /("[^"]*"|\w+)/.test(str);
      case ParamType.number:
        return /-?\d+/.test(str);
      case ParamType.range:
        return /(\d+\.\.\d+|\d+\.\.|..\d+|\d+|\.\.\d+)/.test(str);
      case ParamType.float:
        return /-?\d+(\.\d+)?/.test(str);
      case ParamType.yaw:
        return /-?(180|1[0-7][0-9]|[1-9]?[0-9])/.test(str);
      case ParamType.pitch:
        return /-?(90|[1-8]?[0-9])/.test(str);
      case ParamType.location:
        return /((~|\^|\d+)\.?)/.test(str);
      case ParamType.xpLevel:
        return /-?(\d+)L?/.test(str);
      case ParamType.itemNBT:
      case ParamType.rawJsonMessage:
        let ok = true;
        try {
          JSON.parse(str);
        } catch {
          ok = false;
        }
        return ok;
      case ParamType.executeChainedOption: {
        const values = execute.overloads!.map((overload) => {
          const value = overload.params[0].value;
          if (Array.isArray(value)) {
            return value.join("|");
          }
          return value;
        });
        return new RegExp(`\\b${values.join("|")}\\b`, "g").test(str);
      }
      case ParamType.scoreboardOperation:
        return /(%=|\*=|\+=|-=|\/=|<|=|>|><)/.test(str);
      // rockide specific
      case ParamType.RockideLootTable:
      case ParamType.RockideParticle: {
        const value = getParamValue(rockide, info);
        if (Array.isArray(value)) {
          return new RegExp(`\\b${value.join("|")}\\b`, "g").test(str);
        }
        return new RegExp(`\\b${value}\\b`, "g").test(str);
      }
      case ParamType.RockideClientAnimation:
        return /("[^"]*"|[\w.]+)/.test(str);
      case ParamType.RockideMcfunction:
        return /\b\w+\b|\"[^\"]+\"/.test(str);
      case ParamType.RockideMcstructure:
        return /\b\w+:\w+\b|\"[^\"]+\"/.test(str);
      case ParamType.RockideTag:
      case ParamType.RockideScoreboardObjective:
        return /\w+|"[^"]*"/.test(str);
      case ParamType.RockideBlock:
        return /(([\w\S]+:)?[\w\S]+)|("[^"]*")/.test(str);
      case ParamType.RockideTickingarea:
        return /\w/.test(str);
      default: {
        if (Array.isArray(value)) {
          return new RegExp(`\\b${value.join("|")}\\b`, "g").test(str);
        }
        return new RegExp(`\\b${value}\\b`, "g").test(str);
      }
    }
  }
  return {
    document,
    position,
    isCommment() {
      return getCurrentText().startsWith("#");
    },
    isInQuote() {
      return getCurrentText().startsWith('"') && getCurrentText().endsWith('"');
    },
    getCurrentText,
    getCurrentWord,
    getCommandSequences: (): Array<CommandSequence> => {
      const result: Array<CommandSequence> = [];
      const text = getCurrentText();
      if (!text) {
        return result;
      }
      let [...words] = text
        .split(/(\b|(?<=([~^"*=<>])))\s+/g)
        .filter((_, i) => i % 3 === 0)
        .map((arg) => {
          return new RegExp(/((~|\^)-?(\d+)?(\.\d+)?)/g).test(arg) ? arg.match(/((~|\^)-?(\d+)?(\.\d+)?)/g) || [] : arg;
        })
        .flat();
      while (words.length) {
        // executeChain
        const lastCommand = result[result.length - 1];
        if (lastCommand?.command === "execute") {
          // Last command was execute
          const overloads = lastCommand.overloads.filter(({ isMatch }) => isMatch);
          if (overloads.length === 1) {
            const overload = overloads[0];
            const arg = overload.args[overload.args.length - 1];

            // Handle execute chained option
            if (arg.type === ParamType.executeChainedOption && arg.isMatch && arg.value !== "run") {
              if (Array.isArray(arg.value)) {
                console.error("Execute array value not supported", arg.value);
                throw new Error("Execute array value not supported");
              }
              const word = words.shift();
              if (!word) {
                words.push("execute", arg.value);
              } else {
                words.unshift("execute", arg.value, word);
              }
            }

            // Handle subcommand
            if (arg.type === ParamType.executeChainedOption && arg.isMatch && arg.value === "run") {
              const word = words.shift();
              if (!word) {
                words.push("execute", "run");
              } else {
                words.unshift("execute", "run", word);
              }
            }
          }
        }

        const word = words.shift();
        if (!word) {
          break;
        }

        const command = commands.find(({ command }) => command === word);
        if (!command) {
          console.error("unrecognized command:", word);
          break;
        }
        const { overloads } = command;
        if (!overloads) {
          break;
        }

        let highestIndex = -1;
        const overloadInfo: OverloadInfo[] = overloads.map((overload) => {
          let k = 0;
          let end = false;
          const args = overload.params.map((param) => {
            const arg = words[k];
            k++;

            if (!arg) {
              // End of args, but still have params
              end = true;
            }

            const value = getParamValue(rockide, param);
            if (end) {
              // Provide completion for next param
              return new ArgInfo({
                ...param,
                value,
                isMatch: false,
                originalValue: param.value,
              });
            }

            const ok = testParam(arg, rockide, param);
            if (!ok) {
              // Failed to match
              end = true;
              return new ArgInfo({
                ...param,
                value,
                isMatch: false,
                originalValue: param.value,
              });
            }

            if (highestIndex < k) {
              highestIndex = k - 1;
            }

            return new ArgInfo({
              ...param,
              value: arg,
              isMatch: true,
              originalValue: param.value,
            });
          });
          return {
            args,
            isMatch: true,
          };
        });

        overloadInfo.forEach(({ args }, i) => {
          if (highestIndex === -1) {
            return;
          }
          if (!args[highestIndex]?.isMatch) {
            overloadInfo[i].isMatch = false;
          }
        });

        words = words.slice(highestIndex + 1);

        result.push({
          command: command.command,
          documentation: command.documentation,
          overloads: overloadInfo,
        });
      }
      return result;
    },
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
      const param = currentData?.split("=")[0];
      const value = currentData?.split("=").slice(1).join("=") || undefined;
      return {
        selector,
        data,
        currentData: {
          data: currentData,
          param,
          value,
        },
      };
    },
    getDefaultCommandCompletions: (): vscode.CompletionItem[] => {
      return commands.map(({ command, documentation }) => {
        const completion = new vscode.CompletionItem(command, vscode.CompletionItemKind.Class);
        const markdown = new vscode.MarkdownString(`## ${command}\n\n${documentation}`);
        completion.documentation = markdown;
        return completion;
      });
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

export type CommandContext = NonNullable<ReturnType<typeof createCommandContext>>;

export type CommandSequence = {
  command: string;
  documentation?: string | vscode.MarkdownString;
  overloads: Array<OverloadInfo>;
};

export type OverloadInfo = {
  isMatch: boolean;
  args: Array<ArgInfo>;
};

export type ArgInfoData = ParamInfo & {
  isMatch: boolean;
  originalValue: string | string[];
};

export class ArgInfo implements ArgInfoData {
  documentation?: string | string[] | vscode.MarkdownString | vscode.MarkdownString[] | undefined;
  isMatch: boolean;
  required?: boolean | undefined;
  signatureValue?: string | undefined;
  type: ParamType;
  value: string | string[];
  originalValue: string | string[];
  constructor(data: ArgInfoData) {
    this.type = data.type;
    this.value = data.value;
    this.isMatch = data.isMatch;
    this.documentation = data.documentation;
    this.signatureValue = data.signatureValue;
    this.required = data.required;
    this.originalValue = data.originalValue;
  }
  private getKind() {
    switch (this.type) {
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
  }
  private getDocs() {
    if (Array.isArray(this.value)) {
      return "";
    }
    switch (this.type) {
      case ParamType.playerSelector:
      case ParamType.selectorWildcard:
      case ParamType.scoreboardSelector:
        {
          if (this.value.startsWith('"')) {
            return "Player name or fake player.";
          }
          switch (this.value) {
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
  }
  createCompletion() {
    if (Array.isArray(this.value)) {
      return this.value.map((v, i) => {
        let documentation = this.getDocs() ?? this.documentation;
        if (Array.isArray(documentation)) {
          documentation = documentation[i];
        }
        if (v.includes(" ") && ![ParamType.itemNBT, ParamType.rawJsonMessage].includes(this.type)) {
          v = `"${v}"`;
        }
        const completion = new vscode.CompletionItem(v, this.getKind());
        completion.documentation = documentation;
        if (this.type === ParamType.number) {
          completion.sortText = i.toString().padStart(2, "0");
        }
        return completion;
      });
    }
    const completion = new vscode.CompletionItem(this.value, this.getKind());
    let documentation = this.getDocs() ?? this.documentation;
    if (Array.isArray(documentation)) {
      documentation = documentation[0];
    }
    completion.documentation = documentation;
    return completion;
  }
}
