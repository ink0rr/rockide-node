import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, bpGlob } from "../../constants";
import { Rockide } from "../../rockide";
import { legend, SemanticToken } from "../../semantics";
import { createJsonContext } from "../json/context";
import { createCommandContext } from "./context";
import { commands } from "./data";
import { commandHandlers, jsonCommandHandlers } from "./handlers";

/**
 * TODO:
 * - Entity selector
 * - Diagnostics
 * - Tag definition
 * - Scoreboard definition
 * - Function definition
 * - Signature helper
 */

export const commandTokens: SemanticToken[] = [
  {
    pattern: /([a-zA-Z_]+):/g,
    type: "class",
  },
  {
    pattern: /(?<=[a-zA-Z_]+:)([a-zA-Z_.]+)/g,
    type: "function",
  },
  {
    pattern: /"[^"]*"/g,
    type: "regexp",
  },
  {
    // Comment
    pattern: /(?<!(\b|.))#\s*.*/g,
    type: "comment",
  },
  {
    // pattern: new RegExp(`(^|[\\/\\s])(${commands.map(({ command }) => command).join("|")})\\b`, "g"),
    pattern: new RegExp(`(\\b|\\/)(${commands.map(({ command }) => command).join("|")})\\b`, "g"),
    type: "class",
  },
  {
    pattern: /(((@a|@e|@s|@p|@r)(\[(.*?)\])?)|\*)/g,
    type: "macro",
  },
  {
    pattern: /(?<!\.)\b\d+(\.\d+)?(?!\.)f?\b/g,
    type: "number",
  },
  {
    pattern: /(^|[\/\s])(false|true|align|anchored|as|at|facing|in|positioned|rotated|run)\b/g,
    type: "keyword",
  },
  {
    pattern: /(^|[\/\s])(objectives)/g,
    type: "function",
  },
  // Commands
  // Clear item identifier
  {
    pattern: /(?<=(clear|give)\s.*?\s)([a-zA-Z_]*:)/g,
    type: "class",
  },
  {
    pattern: /(?<=(clear|give)\s.*?\s[a-zA-Z_]*:)([a-zA-Z_]*)(?=)/g,
    type: "function",
  },
];

export class CommandProvider
  implements
    vscode.CompletionItemProvider,
    vscode.DocumentSemanticTokensProvider,
    vscode.SignatureHelpProvider,
    vscode.DefinitionProvider
{
  constructor(private rockide: Rockide) {}
  provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Definition | vscode.DefinitionLink[]> {
    for (const handler of commandHandlers) {
      if (isMatch(document.uri.fsPath, handler.pattern)) {
        if (handler.process) {
          const ctx = createCommandContext(this.rockide, document, position);
          const definitions = handler.process(ctx, this.rockide)?.definitions?.();
          return Promise.all(definitions ?? []);
        }
      }
    }
    for (const handler of jsonCommandHandlers) {
      if (!isMatch(document.uri.fsPath, handler.pattern)) {
        continue;
      }
      if (handler.process) {
        const commandContext = createCommandContext(this.rockide, document, position);
        const jsonContext = createJsonContext(document, position);
        const definitions = handler.process(jsonContext, commandContext, this.rockide)?.definitions?.();
        return Promise.all(definitions ?? []);
      }
    }
  }
  provideSignatureHelp(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.SignatureHelp> {
    for (const handler of commandHandlers) {
      if (isMatch(document.uri.fsPath, handler.pattern)) {
        if (handler.process) {
          const ctx = createCommandContext(this.rockide, document, position);
          const signature = handler.process(ctx, this.rockide)?.signature?.();
          return signature;
        }
      }
    }
    for (const handler of jsonCommandHandlers) {
      if (!isMatch(document.uri.fsPath, handler.pattern)) {
        continue;
      }
      if (handler.process) {
        const commandContext = createCommandContext(this.rockide, document, position);
        const jsonContext = createJsonContext(document, position);
        const signature = handler.process(jsonContext, commandContext, this.rockide)?.signature?.();
        return signature;
      }
    }
  }
  provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.ProviderResult<vscode.SemanticTokens> {
    const text = document.getText();
    const tokens = new vscode.SemanticTokensBuilder(legend);

    const assignTokens = (text: string, basePos?: vscode.Position) => {
      for (const { pattern, type, modifiers } of commandTokens) {
        let match;
        while ((match = pattern.exec(text))) {
          const start = basePos ? basePos.translate(0, match.index) : document.positionAt(match.index);
          const length = match[0].length;
          const range = new vscode.Range(start, start.translate(0, length));
          tokens.push(range, type, modifiers);
        }
      }
    };

    for (const handler of commandHandlers) {
      if (!isMatch(document.uri.fsPath, handler.pattern)) {
        continue;
      }
      assignTokens(text);
    }
    for (const handler of jsonCommandHandlers) {
      if (!isMatch(document.uri.fsPath, handler.pattern)) {
        continue;
      }
      const root = this.rockide.jsonFiles.get(document.uri.fsPath);
      if (!root) {
        return;
      }
      const scan = (node: JSONC.Node) => {
        if (handler.semanticNode?.(node)) {
          const value = node.value;
          if (value) {
            assignTokens(value, document.positionAt(node.offset + 1));
          }
        } else {
          for (const child of node.children ?? []) {
            scan(child);
          }
        }
      };
      scan(root);
    }
    return tokens.build();
  }
  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
    for (const handler of commandHandlers) {
      if (isMatch(document.uri.fsPath, handler.pattern)) {
        if (handler.process) {
          const ctx = createCommandContext(this.rockide, document, position);
          const completions = handler.process(ctx, this.rockide)?.completions?.();
          return completions?.map((value) => ctx.createCompletion(value));
        }
      }
    }
    for (const handler of jsonCommandHandlers) {
      if (!isMatch(document.uri.fsPath, handler.pattern)) {
        continue;
      }
      if (handler.process) {
        const commandContext = createCommandContext(this.rockide, document, position);
        const jsonContext = createJsonContext(document, position);
        const completions = handler.process(jsonContext, commandContext, this.rockide)?.completions?.();
        return completions?.map((value) => commandContext.createCompletion(value));
      }
    }
  }
  async onDidCreate(uri: vscode.Uri) {
    if (isMatch(uri.fsPath, `${baseGlob}/${bpGlob}/functions/**/*.mcfunction`)) {
      this.rockide.indexMcfunction(uri);
    }
  }
  onDidDelete(uri: vscode.Uri) {
    if (isMatch(uri.fsPath, `${baseGlob}/${bpGlob}/functions/**/*.mcfunction`)) {
      this.rockide.mcfunctions.delete(uri.fsPath);
    }
  }
}
