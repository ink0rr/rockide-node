import * as vscode from "vscode";
import { molangMath, molangNamespaces, molangQueries } from "./molang_data";

export function getMolangCompletions(document: vscode.TextDocument, position: vscode.Position) {
  const molangRange = document.getWordRangeAtPosition(position, /\b(q|query)\.(\w+)?/);
  if (molangRange) {
    const prefix = document.getText(molangRange)[1] === "." ? "q" : "query";
    return molangQueries.map((query) => `${prefix}.${query}`);
  }
  const mathRange = document.getWordRangeAtPosition(position, /\bmath\.(\w+)?/);
  if (mathRange) {
    return molangMath;
  }
  return molangNamespaces;
}
