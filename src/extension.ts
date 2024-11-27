import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  console.log("Rockide activated!");
  context.subscriptions.push(
    vscode.commands.registerCommand("rockide.reloadWorkspace", () => {
      // TODO
    }),
  );
}

export function deactivate() {}
