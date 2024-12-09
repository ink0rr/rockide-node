import * as vscode from "vscode";
import { Rockide } from "./rockide";

export async function activate(context: vscode.ExtensionContext) {
  const rockide = new Rockide();
  if (!(await rockide.isMinecraftWorkspace())) {
    return;
  }
  rockide.register(context);
  await rockide.indexWorkspace();
  console.log("Rockide activated!");
}

export function deactivate() {}
