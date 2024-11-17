import * as vscode from "vscode";
import { commandSelector, jsonSelector, mcfunctionSelector, projectGlob } from "./constants";
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
  const molangProvider = new MolangProvider();
  const commandProvider = new CommandProvider(rockide);
  const mcstructureProvider = new McstructureProvider(rockide);
  const tagProvider = new TagProvider(rockide);
  const objectiveProvider = new ObjectiveProvider(rockide);
  const tickingareaProvider = new TickingareaProvider(rockide);
  const watcher = vscode.workspace.createFileSystemWatcher(`**/${projectGlob}/**`);

  context.subscriptions.push(
    watcher,
    vscode.commands.registerCommand("rockide.reloadWorkspace", () => rockide.indexWorkspace()),
    vscode.commands.registerCommand("rockide.insertParentheses", async () => {
      await vscode.commands.executeCommand("cursorLeft");
      await vscode.commands.executeCommand("editor.action.triggerParameterHints");
    }),

    // json
    vscode.languages.registerCompletionItemProvider(jsonSelector, jsonProvider, "."),
    vscode.languages.registerDefinitionProvider(jsonSelector, jsonProvider),
    watcher.onDidChange((uri) =>
      vscode.workspace.openTextDocument(uri).then(
        (document) => jsonProvider.onDidChangeTextDocument(document),
        () => {},
      ),
    ),
    watcher.onDidCreate((uri) => jsonProvider.onDidCreate(uri)),
    watcher.onDidDelete((uri) => jsonProvider.onDidDelete(uri)),

    // molang
    vscode.languages.registerDocumentSemanticTokensProvider(jsonSelector, molangProvider, legend),
    // mcfunction
    vscode.languages.registerDefinitionProvider(commandSelector, commandProvider),
    watcher.onDidCreate((uri) => commandProvider.onDidCreate(uri)),
    watcher.onDidDelete((uri) => commandProvider.onDidDelete(uri)),
    vscode.languages.registerDocumentSemanticTokensProvider(mcfunctionSelector, commandProvider, legend),
    vscode.languages.registerCompletionItemProvider(mcfunctionSelector, commandProvider, " ", "=", ","),
    vscode.languages.registerSignatureHelpProvider(mcfunctionSelector, commandProvider, " ", ""),
    // commands (json)
    vscode.languages.registerCompletionItemProvider(jsonSelector, commandProvider, "/", "=", ",", " "),
    vscode.languages.registerSignatureHelpProvider(jsonSelector, commandProvider, "/", " "),
    // mcstructure
    watcher.onDidCreate((uri) => mcstructureProvider.onDidCreate(uri)),
    watcher.onDidDelete((uri) => mcstructureProvider.onDidDelete(uri)),
    // tag
    watcher.onDidChange((uri) =>
      vscode.workspace.openTextDocument(uri).then(
        (document) => tagProvider.onDidChangeTextDocument(document),
        () => {},
      ),
    ),
    watcher.onDidCreate((uri) => tagProvider.onDidCreate(uri)),
    watcher.onDidDelete((uri) => tagProvider.onDidDelete(uri)),
    // objectives
    watcher.onDidChange((uri) =>
      vscode.workspace.openTextDocument(uri).then(
        (document) => objectiveProvider.onDidChangeTextDocument(document),
        () => {},
      ),
    ),
    watcher.onDidCreate((uri) => objectiveProvider.onDidCreate(uri)),
    watcher.onDidDelete((uri) => objectiveProvider.onDidDelete(uri)),
    // tickingarea
    watcher.onDidChange((uri) =>
      vscode.workspace.openTextDocument(uri).then(
        (document) => tickingareaProvider.onDidChangeTextDocument(document),
        () => {},
      ),
    ),
    watcher.onDidCreate((uri) => tickingareaProvider.onDidCreate(uri)),
    watcher.onDidDelete((uri) => tickingareaProvider.onDidDelete(uri)),
  );
}

export function deactivate() {}
