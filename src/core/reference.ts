import * as vscode from "vscode";

export class Reference {
  constructor(
    public value: string,
    public uri: vscode.Uri,
    public range?: vscode.Range,
  ) {}
}
