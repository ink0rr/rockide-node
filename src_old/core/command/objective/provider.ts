import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { commandGlobs } from "../../../constants";
import { Rockide } from "../../../rockide";

export class ObjectiveProvider {
  constructor(private rockide: Rockide) {}
  async onDidCreate(uri: vscode.Uri) {
    if (commandGlobs.some((glob) => isMatch(uri.fsPath, glob))) {
      const { fsPath } = uri;
      const document = await vscode.workspace.openTextDocument(fsPath);
      await this.rockide.indexObjective(document, fsPath);
    }
  }
  onDidDelete(uri: vscode.Uri) {
    if (commandGlobs.some((glob) => isMatch(uri.fsPath, glob))) {
      this.rockide.objectives.deleteByPath(uri.fsPath);
    }
  }
  async onDidChangeTextDocument(document: vscode.TextDocument) {
    this.rockide.objectives.deleteByPath(document.uri.fsPath);
    const { fsPath } = document.uri;
    await this.rockide.indexObjective(document, fsPath);
  }
}
