import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { commandGlobs } from "../../../constants";
import { Rockide } from "../../../rockide";

export class TagProvider {
  constructor(private rockide: Rockide) {}
  async onDidCreateFiles({ files }: vscode.FileCreateEvent) {
    const matchingFiles = files.filter((uri) => commandGlobs.some((glob) => isMatch(uri.fsPath, glob)));
    for (const uri of matchingFiles) {
      const { fsPath } = uri;
      const document = await vscode.workspace.openTextDocument(fsPath);
      await this.rockide.indexTags(document, fsPath);
    }
  }
  async onDidRenameFiles({ files }: vscode.FileRenameEvent) {
    for (const { newUri, oldUri } of files) {
      if (commandGlobs.some((glob) => isMatch(newUri.fsPath, glob))) {
        const document = await vscode.workspace.openTextDocument(newUri.fsPath);
        await this.rockide.indexTags(document, newUri.fsPath);
      }
      this.rockide.tags.deleteByPath(oldUri.fsPath);
    }
  }
  onDidDeleteFiles({ files }: vscode.FileDeleteEvent) {
    for (const uri of files) {
      if (commandGlobs.some((glob) => isMatch(uri.fsPath, glob))) {
        this.rockide.tags.deleteByPath(uri.fsPath);
      }
    }
  }
  async onDidChangeTextDocument({ document }: vscode.TextDocumentChangeEvent) {
    this.rockide.tags.deleteByPath(document.uri.fsPath);
    const { fsPath } = document.uri;
    await this.rockide.indexTags(document, fsPath);
  }
}
