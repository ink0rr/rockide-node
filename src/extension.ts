import * as vscode from "vscode";
import { commandSelector, jsonSelector, mcfunctionSelector } from "./constants";
import { ObjectiveProvider } from "./core/command/objective/provider";
import { CommandProvider } from "./core/command/provider";
import { TagProvider } from "./core/command/tag/provider";
import { TickingareaProvider } from "./core/command/tickingarea/provider";
import { JsonProvider } from "./core/json/provider";
import { McstructureProvider } from "./core/mcstructure/provider";
import { MolangProvider } from "./core/molang/provider";
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
  const objectiveProvider = new ObjectiveProvider(rockide);
  const tickingareaProvider = new TickingareaProvider(rockide);

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
    vscode.languages.registerDefinitionProvider(commandSelector, commandProvider),
    vscode.workspace.onDidCreateFiles((e) => commandProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => commandProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => commandProvider.onDidDeleteFiles(e)),
    vscode.languages.registerDocumentSemanticTokensProvider(commandSelector, commandProvider, legend),
    vscode.languages.registerCompletionItemProvider(mcfunctionSelector, commandProvider, " ", "=", ","),
    vscode.languages.registerSignatureHelpProvider(mcfunctionSelector, commandProvider, " ", ""),
    // commands (json)
    vscode.languages.registerCompletionItemProvider(jsonSelector, commandProvider, "/", "=", ",", " "),
    vscode.languages.registerSignatureHelpProvider(jsonSelector, commandProvider, "/", " "),
    // mcstructure
    vscode.workspace.onDidCreateFiles((e) => mcstructureProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => mcstructureProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => mcstructureProvider.onDidDeleteFiles(e)),
    // tag
    vscode.workspace.onDidCreateFiles((e) => tagProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => tagProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => tagProvider.onDidDeleteFiles(e)),
    vscode.workspace.onDidChangeTextDocument((e) => tagProvider.onDidChangeTextDocument(e)),
    // objectives
    vscode.workspace.onDidCreateFiles((e) => objectiveProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => objectiveProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => objectiveProvider.onDidDeleteFiles(e)),
    vscode.workspace.onDidChangeTextDocument((e) => objectiveProvider.onDidChangeTextDocument(e)),
    // tickingarea
    vscode.workspace.onDidCreateFiles((e) => tickingareaProvider.onDidCreateFiles(e)),
    vscode.workspace.onDidRenameFiles((e) => tickingareaProvider.onDidRenameFiles(e)),
    vscode.workspace.onDidDeleteFiles((e) => tickingareaProvider.onDidDeleteFiles(e)),
    vscode.workspace.onDidChangeTextDocument((e) => tickingareaProvider.onDidChangeTextDocument(e)),
  );
}

export function deactivate() {}
