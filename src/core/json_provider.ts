import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, NullNode, projectGlob } from "../constants";
import { Rockide } from "../rockide";
import { createJsonContext } from "./json_context";
import { jsonHandlers } from "./json_handlers";

export class JsonProvider implements vscode.CompletionItemProvider, vscode.DefinitionProvider {
  constructor(private rockide: Rockide) {}
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
    for (const handler of jsonHandlers) {
      if (isMatch(document.uri.fsPath, handler.pattern)) {
        if (handler.process) {
          const ctx = createJsonContext(document, position);
          const completions = handler.process(ctx, this.rockide)?.completions?.();
          return completions?.map((value) => ctx.createCompletion(value));
        }
      }
    }
  }
  provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Definition | vscode.DefinitionLink[]> {
    for (const handler of jsonHandlers) {
      if (isMatch(document.uri.fsPath, handler.pattern)) {
        if (handler.process) {
          const ctx = createJsonContext(document, position);
          const definitions = handler.process(ctx, this.rockide)?.definitions?.();
          return Promise.all(definitions ?? []);
        }
      }
    }
  }
  onDidChangeTextDocument({ document }: vscode.TextDocumentChangeEvent) {
    if (this.rockide.jsonFiles.has(document.uri.fsPath)) {
      const text = document.getText();
      const json = JSONC.parseTree(text) ?? NullNode;
      this.rockide.jsonFiles.set(document.uri.fsPath, json);
    }
  }
  async onDidCreateFiles({ files }: vscode.FileCreateEvent) {
    for (const uri of files) {
      if (!isMatch(uri.fsPath, `${baseGlob}/${projectGlob}/**/*`)) {
        continue;
      }
      if (uri.fsPath.endsWith(".json")) {
        await this.rockide.indexJson(uri);
      } else {
        this.rockide.indexAsset(uri);
      }
    }
  }
  async onDidRenameFiles({ files }: vscode.FileRenameEvent) {
    for (const { oldUri, newUri } of files) {
      if (isMatch(oldUri.fsPath, `${baseGlob}/${projectGlob}/**/*`)) {
        this.rockide.jsonFiles.delete(oldUri.fsPath);
        this.rockide.jsonAssets = this.rockide.jsonAssets.filter((v) => v.uri.fsPath !== oldUri.fsPath);
        this.rockide.assets = this.rockide.assets.filter((v) => v.uri.fsPath !== oldUri.fsPath);
      }
      if (!isMatch(newUri.fsPath, `${baseGlob}/${projectGlob}/**/*`)) {
        continue;
      }
      if (newUri.fsPath.endsWith(".json")) {
        await this.rockide.indexJson(newUri);
      } else {
        this.rockide.indexAsset(newUri);
      }
    }
  }
  onDidDeleteFiles({ files }: vscode.FileDeleteEvent) {
    for (const uri of files) {
      if (isMatch(uri.fsPath, `${baseGlob}/${projectGlob}/**/*`)) {
        this.rockide.jsonFiles.delete(uri.fsPath);
        this.rockide.jsonAssets = this.rockide.jsonAssets.filter((v) => v.uri.fsPath !== uri.fsPath);
        this.rockide.assets = this.rockide.assets.filter((v) => v.uri.fsPath !== uri.fsPath);
      }
    }
  }
}
