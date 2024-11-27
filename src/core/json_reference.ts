import * as JSONC from "jsonc-parser";
import * as vscode from "vscode";
import { Reference } from "./reference";

export class JsonReference extends Reference {
  constructor(document: vscode.TextDocument, node: JSONC.Node, value?: string) {
    super(
      value ?? node.value,
      document.uri,
      new vscode.Range(document.positionAt(node.offset), document.positionAt(node.offset + node.length)),
    );
  }
}
