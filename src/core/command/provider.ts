import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, bpGlob } from "../../constants";
import { Rockide } from "../../rockide";
import { legend, SemanticToken } from "../../semantics";
import { createCommandContext } from "./context";
import { commands } from "./data";
import { commandHandlers } from "./handlers";

/**
 * TODO:
 * - Entity selector
 * - Diagnostics
 * - Tag definition
 * - Scoreboard definition
 * - Function definition
 * - Signature helper
 */

const semantics: SemanticToken[] = [
  {
    pattern: /([a-zA-Z_]+):/g,
    type: "class",
  },
  {
    pattern: /(?<=[a-zA-Z_]+:)([a-zA-Z_]+)/g,
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
  }
  provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.ProviderResult<vscode.SemanticTokens> {
    const text = document.getText();
    const tokens = new vscode.SemanticTokensBuilder(legend);
    for (const handler of commandHandlers) {
      if (!isMatch(document.uri.fsPath, handler.pattern)) {
        continue;
      }
      for (const { pattern, type, modifiers } of semantics) {
        let match;
        while ((match = pattern.exec(text))) {
          const start = match.index;
          const length = match[0].length;
          const position = document.positionAt(start);
          const range = new vscode.Range(position, position.translate(0, length));
          tokens.push(range, type, modifiers);
        }
      }
      return tokens.build();
    }
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
  }
  async onDidCreateFiles({ files }: vscode.FileCreateEvent) {
    for (const uri of files) {
      if (!isMatch(uri.fsPath, `${baseGlob}/${bpGlob}/functions/**/*.mcfunction`)) {
        continue;
      }
      this.rockide.indexMcfunction(uri);
    }
  }
  async onDidRenameFiles({ files }: vscode.FileRenameEvent) {
    for (const { newUri, oldUri } of files) {
      // If moved to outside project directory
      if (!isMatch(newUri.fsPath, `${baseGlob}/${bpGlob}/functions/**/*.mcfunction`)) {
        this.rockide.mcfunctions.delete(oldUri.fsPath);
        continue;
      }
      this.rockide.mcfunctions.delete(oldUri.fsPath);
      this.rockide.indexMcfunction(newUri);
    }
  }
  onDidDeleteFiles({ files }: vscode.FileDeleteEvent) {
    for (const uri of files) {
      if (!isMatch(uri.fsPath, `${baseGlob}/${bpGlob}/functions/**/*.mcfunction`)) {
        continue;
      }
      this.rockide.mcfunctions.delete(uri.fsPath);
    }
  }
}
