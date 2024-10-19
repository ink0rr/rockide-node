import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, bpGlob } from "../../constants";
import { Rockide } from "../../rockide";

const mcstructureGlob = `${baseGlob}/${bpGlob}/functions/**/*.mcfunction`;

export class McstructureProvider {
  constructor(private rockide: Rockide) {}
  async onDidCreateFiles({ files }: vscode.FileCreateEvent) {
    for (const uri of files) {
      if (!isMatch(uri.fsPath, mcstructureGlob)) {
        continue;
      }
      this.rockide.indexMcstructure(uri);
    }
  }
  async onDidRenameFiles({ files }: vscode.FileRenameEvent) {
    for (const { newUri, oldUri } of files) {
      // If moved to outside project directory
      if (!isMatch(newUri.fsPath, mcstructureGlob)) {
        this.rockide.structures.delete(oldUri.fsPath);
        continue;
      }
      this.rockide.structures.delete(oldUri.fsPath);
      this.rockide.indexMcstructure(newUri);
    }
  }
  onDidDeleteFiles({ files }: vscode.FileDeleteEvent) {
    for (const uri of files) {
      if (!isMatch(uri.fsPath, mcstructureGlob)) {
        continue;
      }
      this.rockide.structures.delete(uri.fsPath);
    }
  }
}
