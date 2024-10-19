import * as vscode from "vscode";
import { createMolangContext } from "./context";
import { molangPrefixes } from "./data";

export function getMolangCompletions(document: vscode.TextDocument, position: vscode.Position) {
  const ctx = createMolangContext(document, position);
  const prefix = ctx.getPrefix();
  const molangData = ctx.getMolangData(prefix);
  if (molangData) {
    return molangData.map(({ name, signature, description }) => {
      const completion = new vscode.CompletionItem(`${prefix}.${name}`, vscode.CompletionItemKind.Method);
      completion.documentation = description;
      completion.detail = `${name}${signature}`;
      if (signature[0] !== ":") {
        completion.insertText = `${completion.label}()`;
        completion.command = {
          title: "Insert Parentheses",
          command: "rockide.insertParentheses",
        };
      }
      return completion;
    });
  }
  return molangPrefixes;
}
