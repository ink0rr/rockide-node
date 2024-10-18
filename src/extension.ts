import * as vscode from "vscode";
import { commandSelector, jsonSelector } from "./constants";
import { JsonProvider } from "./core/json_provider";
import { CommandProvider } from "./core/mcfunction_provider";
import { McstructureProvider } from "./core/mcstructure_provider";
import { MolangProvider } from "./core/molang_provider";
import { TagProvider } from "./core/tag_provider";
import { Rockide } from "./rockide";
import { legend } from "./semantics";

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
  const molangProvider = new MolangProvider(rockide);
  const commandProvider = new CommandProvider(rockide);
  const mcstructureProvider = new McstructureProvider(rockide);
  const tagProvider = new TagProvider(rockide);

  context.subscriptions.push(
    vscode.commands.registerCommand("rockide.reloadWorkspace", () => rockide.indexWorkspace()),
    vscode.commands.registerCommand("rockide.insertParentheses", async () => {
      await vscode.commands.executeCommand("cursorLeft");
      await vscode.commands.executeCommand("editor.action.triggerParameterHints");
    }),

    // json
    vscode.languages.registerCompletionItemProvider(jsonSelector, jsonProvider, "."),
    vscode.languages.registerDefinitionProvider(jsonSelector, jsonProvider),
    vscode.workspace.onDidChangeTextDocument((e) => jsonProvider.onDidChangeTextDocument(e)),
    vscode.workspace.onDidCreateFiles((e) => jsonProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => jsonProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => jsonProvider.onDidDeleteFiles(e)),

    // molang
    vscode.languages.registerDocumentSemanticTokensProvider(jsonSelector, molangProvider, legend),
    // mcfunction
    vscode.languages.registerCompletionItemProvider(commandSelector, commandProvider, " ", "=", ","),
    vscode.languages.registerDefinitionProvider(commandSelector, commandProvider),
    vscode.workspace.onDidCreateFiles((e) => commandProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => commandProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => commandProvider.onDidDeleteFiles(e)),
    vscode.languages.registerDocumentSemanticTokensProvider(commandSelector, commandProvider, legend),
    vscode.languages.registerSignatureHelpProvider(commandSelector, commandProvider, " ", ""),
    // mcstructure
    vscode.workspace.onDidCreateFiles((e) => mcstructureProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => mcstructureProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => mcstructureProvider.onDidDeleteFiles(e)),
    // tag
    vscode.workspace.onDidCreateFiles((e) => tagProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => tagProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => tagProvider.onDidDeleteFiles(e)),
    vscode.workspace.onDidChangeTextDocument((e) => tagProvider.onDidChangeTextDocument(e)),
  );
}

export function deactivate() {}
