import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { commandGlobs } from "../../../constants";
import { Rockide } from "../../../rockide";

export class TagProvider {
  constructor(private rockide: Rockide) {}
  async onDidCreate(uri: vscode.Uri) {
    if (commandGlobs.some((glob) => isMatch(uri.fsPath, glob))) {
      const { fsPath } = uri;
      const document = await vscode.workspace.openTextDocument(fsPath);
      await this.rockide.indexTags(document, fsPath);
    }
  }
  onDidDelete(uri: vscode.Uri) {
    if (commandGlobs.some((glob) => isMatch(uri.fsPath, glob))) {
      this.rockide.tags.deleteByPath(uri.fsPath);
    }
  }
  async onDidChangeTextDocument(document: vscode.TextDocument) {
    this.rockide.tags.deleteByPath(document.uri.fsPath);
    const { fsPath } = document.uri;
    await this.rockide.indexTags(document, fsPath);
  }
}
