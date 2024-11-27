import * as vscode from "vscode";
import { Rockide } from "./rockide";

export async function activate(context: vscode.ExtensionContext) {
  const rockide = new Rockide();
  if (!rockide.isMinecraftWorkspace()) {
    return;
  }
  rockide.register(context);
  await rockide.scanWorkspace();
  console.log("Rockide activated!");
}

export function deactivate() {}
