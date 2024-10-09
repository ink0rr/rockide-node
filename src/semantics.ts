import * as vscode from "vscode";

export type SemanticToken = {
  pattern: RegExp;
  type: string;
  modifiers?: string[];
};

export const legend = new vscode.SemanticTokensLegend([
  "class",
  "enumMember",
  "function",
  "macro",
  "number",
  "operator",
  "regexp",
  "string",
  "variable",
]);
