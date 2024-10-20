import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, bpGlob } from "../../../constants";
import { Rockide } from "../../../rockide";

const globs = [`${baseGlob}/${bpGlob}/functions/**/*.mcfunction`, `${baseGlob}/${bpGlob}/entities/**/*.json`];

export class ObjectiveProvider {
  constructor(private rockide: Rockide) {}
  async onDidCreateFiles({ files }: vscode.FileCreateEvent) {
    for (const uri of files) {
      for (const glob of globs) {
        if (!isMatch(uri.fsPath, glob)) {
          continue;
        }
        await this.rockide.indexObjective(uri);
      }
    }
  }
  async onDidRenameFiles({ files }: vscode.FileRenameEvent) {
    for (const { newUri, oldUri } of files) {
      for (const glob of globs) {
        if (!isMatch(newUri.fsPath, glob)) {
          this.rockide.tags.deleteByPath(oldUri.fsPath);
          continue;
        }
        this.rockide.tags.deleteByPath(oldUri.fsPath);
        await this.rockide.indexObjective(newUri);
      }
    }
  }
  onDidDeleteFiles({ files }: vscode.FileDeleteEvent) {
    for (const uri of files) {
      for (const glob of globs) {
        if (!isMatch(uri.fsPath, glob)) {
          continue;
        }
        this.rockide.tags.deleteByPath(uri.fsPath);
      }
    }
  }
  async onDidChangeTextDocument({ document }: vscode.TextDocumentChangeEvent) {
    this.rockide.tags.deleteByPath(document.uri.fsPath);
    await this.rockide.indexObjective(document.uri);
  }
}
