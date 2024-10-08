import * as vscode from "vscode";
import { JsonProvider } from "./providers/json";
import { MolangProvider } from "./providers/molang";
import { Rockide } from "./rockide";
import { legend } from "./semantics";

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

  const jsonProvider = new JsonProvider(rockide);
  const molangProvider = new MolangProvider();

  context.subscriptions.push(
    vscode.commands.registerCommand("rockide.reloadWorkspace", () => rockide.indexWorkspace()),

    vscode.languages.registerCompletionItemProvider(selector, jsonProvider, "."),
    vscode.languages.registerDefinitionProvider(selector, jsonProvider),
    vscode.workspace.onDidChangeTextDocument(jsonProvider.onDidChangeTextDocument),
    vscode.workspace.onDidCreateFiles(jsonProvider.onDidCreateFiles),
    vscode.workspace.onDidRenameFiles(jsonProvider.onDidRenameFiles),
    vscode.workspace.onDidDeleteFiles(jsonProvider.onDidDeleteFiles),

    vscode.languages.registerDocumentSemanticTokensProvider(selector, molangProvider, legend),
  );
}

export function deactivate() {}
