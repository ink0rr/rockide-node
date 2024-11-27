import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, bpGlob } from "../../constants";
import { Rockide } from "../../rockide";

const mcstructureGlob = `${baseGlob}/${bpGlob}/functions/**/*.mcfunction`;

export class McstructureProvider {
  constructor(private rockide: Rockide) {}
  async onDidCreate(uri: vscode.Uri) {
    if (isMatch(uri.fsPath, mcstructureGlob)) {
      this.rockide.indexMcstructure(uri);
    }
  }
  onDidDelete(uri: vscode.Uri) {
    if (isMatch(uri.fsPath, mcstructureGlob)) {
      this.rockide.structures.delete(uri.fsPath);
    }
  }
}
