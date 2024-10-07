import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, projectGlob } from "./constants";
import { createContext } from "./context";
import { fileHandlers } from "./handlers";
import { Rockide } from "./rockide";
import { legend, molangSemantics } from "./semantics";

const selector: vscode.DocumentSelector = [
  { scheme: "file", language: "json" },
  { scheme: "file", language: "jsonc" },
];

export async function activate(context: vscode.ExtensionContext) {
  const rockide = new Rockide();
  const isBedrock = await rockide.checkWorkspace();
  if (!isBedrock) {
    console.log("Not a Bedrock Workspace, Rockide is disabled.");
    return;
  }
  console.log("Rockide activated!");
  await rockide.indexWorkspace();

  context.subscriptions.push(
    vscode.commands.registerCommand("rockide.reloadWorkspace", () => rockide.indexWorkspace()),
    vscode.languages.registerCompletionItemProvider(
      selector,
      {
        provideCompletionItems(document, position) {
          for (const handler of fileHandlers) {
            if (isMatch(document.uri.fsPath, handler.pattern)) {
              if (handler.process) {
                const ctx = createContext(document, position);
                const completions = handler.process(ctx, rockide)?.completions?.();
                return completions?.map((value) => ctx.createCompletion(value));
              }
            }
          }
        },
      },
      ".",
    ),
    vscode.languages.registerDefinitionProvider(selector, {
      provideDefinition(document, position) {
        for (const handler of fileHandlers) {
          if (isMatch(document.uri.fsPath, handler.pattern)) {
            if (handler.process) {
              const ctx = createContext(document, position);
              const definitions = handler.process(ctx, rockide)?.definitions?.();
              return Promise.all(definitions ?? []);
            }
          }
        }
      },
    }),
    vscode.workspace.onDidChangeTextDocument(({ document }) => {
      if (rockide.files.has(document.uri.fsPath)) {
        const text = document.getText();
        const json = JSONC.parse(text);
        rockide.files.set(document.uri.fsPath, json);
      }
    }),
    vscode.workspace.onDidCreateFiles(async ({ files }) => {
      for (const uri of files) {
        if (!isMatch(uri.fsPath, `${baseGlob}/${projectGlob}/**/*.json`)) {
          continue;
        }
        if (uri.fsPath.endsWith(".json")) {
          await rockide.indexFile(uri);
          continue;
        }
        if (uri.fsPath.match(/\.(png|tga|fsb|ogg|wav)$/)) {
          rockide.indexAsset(uri);
          continue;
        }
      }
    }),
    vscode.workspace.onDidRenameFiles(async ({ files }) => {
      for (const { oldUri, newUri } of files) {
        // If moved to outside project directory
        if (!isMatch(newUri.fsPath, `${baseGlob}/${projectGlob}/**/*.json`)) {
          rockide.files.delete(oldUri.fsPath);
          rockide.assets = rockide.assets.filter((v) => v.uri.fsPath === oldUri.fsPath);
          continue;
        }
        if (oldUri.fsPath.endsWith(".json")) {
          rockide.files.delete(oldUri.fsPath);
          rockide.jsonAssets = rockide.jsonAssets.filter((v) => v.uri.fsPath === oldUri.fsPath);
          await rockide.indexFile(newUri);
          continue;
        }
        rockide.assets = rockide.assets.filter((v) => v.uri.fsPath === oldUri.fsPath);
        if (newUri.fsPath.match(/\.(png|tga|fsb|ogg|wav)$/)) {
          rockide.indexAsset(newUri);
        }
      }
    }),
    vscode.workspace.onDidDeleteFiles(({ files }) => {
      for (const uri of files) {
        if (isMatch(uri.fsPath, `${baseGlob}/${projectGlob}/**/*.json`)) {
          rockide.files.delete(uri.fsPath);
          rockide.assets = rockide.assets.filter((v) => v.uri.fsPath === uri.fsPath);
          rockide.jsonAssets = rockide.jsonAssets.filter((v) => v.uri.fsPath === uri.fsPath);
        }
      }
    }),
    vscode.languages.registerDocumentSemanticTokensProvider(
      selector,
      {
        provideDocumentSemanticTokens(document) {
          const text = document.getText();
          const tokens = new vscode.SemanticTokensBuilder(legend);
          for (const { pattern, type, modifiers } of molangSemantics) {
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
        },
      },
      legend,
    ),
  );
}

export function deactivate() {}
