import * as vscode from "vscode";
import { Rockide } from "./rockide";

export async function activate(context: vscode.ExtensionContext) {
  const rockide = new Rockide();
  if (await rockide.isMinecraftWorkspace()) {
    await rockide.indexWorkspace(context);
    rockide.registerProviders(context);
    console.log("Rockide activated!");
  }
}

export function deactivate() {}
