import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { commandGlobs } from "../../../constants";
import { Rockide } from "../../../rockide";

export class TickingareaProvider {
  constructor(private rockide: Rockide) {}
  async onDidCreateFiles({ files }: vscode.FileCreateEvent) {
    for (const uri of files) {
      for (const glob of commandGlobs) {
        if (!isMatch(uri.fsPath, glob)) {
          continue;
        }
        await this.rockide.indexTickingAreas(uri);
      }
    }
  }
  async onDidRenameFiles({ files }: vscode.FileRenameEvent) {
    for (const { newUri, oldUri } of files) {
      for (const glob of commandGlobs) {
        if (!isMatch(newUri.fsPath, glob)) {
          this.rockide.tickingareas.deleteByPath(oldUri.fsPath);
          continue;
        }
        this.rockide.tickingareas.deleteByPath(oldUri.fsPath);
        await this.rockide.indexTickingAreas(newUri);
      }
    }
  }
  onDidDeleteFiles({ files }: vscode.FileDeleteEvent) {
    for (const uri of files) {
      for (const glob of commandGlobs) {
        if (!isMatch(uri.fsPath, glob)) {
          continue;
        }
        this.rockide.tickingareas.deleteByPath(uri.fsPath);
      }
    }
  }
  async onDidChangeTextDocument({ document }: vscode.TextDocumentChangeEvent) {
    this.rockide.tickingareas.deleteByPath(document.uri.fsPath);
    await this.rockide.indexTickingAreas(document.uri);
  }
}
