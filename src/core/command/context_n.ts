import * as vscode from "vscode";
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
  function getParamRegex(rockide: Rockide, info: ParamInfo): RegExp {
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
      case ParamType.executeChainedOption: {
        const values = execute.overloads!.map((overload) => {
          const value = overload.params[0].value;
          if (Array.isArray(value)) {
            return value.join("|");
          }
          return value;
        });
        return new RegExp(`\\b${values.join("|")}\\b`, "g");
      }
      // rockide specific
      case ParamType.RockideLootTable:
      case ParamType.RockideParticle: {
        const value = getParamValue(rockide, info);
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
  return {
    document,
    position,
    isCommment() {
      return getCurrentText().startsWith("#");
    },
    getCurrentText,
    getCurrentArg: () => {
      const range = document.getWordRangeAtPosition(position, /\b\w+\b|\"[^\"]+\"|\b[\d\.]+\b|[~^*]/);
      if (!range) {
        return;
      }
      return {
        text: document.getText(range),
        range,
      };
    },
    getCommandSequences: (): Array<CommandSequence> => {
      const result: Array<CommandSequence> = [];
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

            const { type, documentation } = param;

            const value = getParamValue(rockide, param);
            if (end) {
              // Provide completion for next param
              return new ArgInfo({
                type,
                value,
                isMatch: false,
                documentation,
              });
            }

            const regex = getParamRegex(rockide, param);
            const match = arg.match(regex);
            if (!match) {
              // Failed to match
              end = true;
              return new ArgInfo({
                type,
                value,
                isMatch: false,
                documentation,
              });
            }

            if (highestIndex < k) {
              highestIndex = k - 1;
            }

            return new ArgInfo({
              // Provide completion for next param
              type,
              value: match[0],
              isMatch: true,
              documentation,
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

type CommandSequence = {
  command: string;
  overloads: Array<OverloadInfo>;
};

type OverloadInfo = {
  isMatch: boolean;
  args: Array<ArgInfo>;
};

type CompletionOpts = {
  skipCurly?: boolean;
  isInQuote?: boolean;
};

type ArgInfoData = ParamInfo & {
  isMatch: boolean;
  opts?: CompletionOpts;
};

class ArgInfo implements ArgInfoData {
  documentation?: string | string[] | vscode.MarkdownString | vscode.MarkdownString[] | undefined;
  isMatch: boolean;
  opts?: CompletionOpts | undefined;
  required?: boolean | undefined;
  signatureValue?: string | undefined;
  type: ParamType;
  value: string | string[];
  constructor(data: ArgInfoData) {
    this.type = data.type;
    this.value = data.value;
    this.isMatch = data.isMatch;
    this.documentation = data.documentation;
    this.opts = data.opts;
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
        if (this.opts?.skipCurly) {
          v = v.slice(1, -1);
        }
        if (v.includes(" ")) {
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
