import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, jsonSelector, projectGlob } from "./constants";
import { JsonProvider } from "./provider/json_provider";
import { storeList } from "./store";

export class Rockide {
  async isMinecraftWorkspace() {
    const manifestPaths = await vscode.workspace.findFiles(`**/${projectGlob}/manifest.json`, "{.*,build,dist,out}");
    if (manifestPaths.length === 0) {
      return false;
    }
    for (const path of manifestPaths) {
      const document = await vscode.workspace.openTextDocument(path);
      const json = JSONC.parse(document.getText());
      if ("format_version" in json && "header" in json && "modules" in json) {
        continue;
      }
      return false;
    }
    return true;
  }

  async indexWorkspace() {
    await vscode.window.withProgress(
      { title: "Rockide: Indexing workspace", location: vscode.ProgressLocation.Notification },
      async (progress) => {
        const startTime = Date.now();
        let totalFiles = 0;
        let current = 0;
        await Promise.all(
          storeList.map(async (store) => {
            const fileList = await vscode.workspace.findFiles(store.pattern, "{.*,build,dist,out}");
            totalFiles += fileList.length;
            await Promise.all(
              fileList.map(async (uri) => {
                await store.parse(uri);
                progress.report({ message: `${++current}/${totalFiles}` });
              }),
            );
          }),
        );
        console.log(`Scanned ${totalFiles} files in ${Date.now() - startTime}ms`);
      },
    );
  }

  register(context: vscode.ExtensionContext) {
    const watcher = vscode.workspace.createFileSystemWatcher(`**/${projectGlob}/**`);
    watcher.onDidChange(this.onChange);
    watcher.onDidCreate(this.onCreate);
    watcher.onDidDelete(this.onDelete);
    context.subscriptions.push(watcher);

    const jsonProvider = new JsonProvider();
    const triggerCharacters = `abcdefghijklmnopqrstuvwxyz:.'" `.split("");
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(jsonSelector, jsonProvider, ...triggerCharacters),
      vscode.languages.registerDefinitionProvider(jsonSelector, jsonProvider),
      vscode.languages.registerRenameProvider(jsonSelector, jsonProvider),
      vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.contentChanges.length > 0) {
          this.onChange(e.document.uri);
        }
      }),
    );
  }

  private async onChange(uri: vscode.Uri) {
    for (const store of storeList) {
      if (isMatch(uri.fsPath, `${baseGlob}/${store.pattern}`)) {
        store.delete(uri);
        await store.parse(uri);
        break;
      }
    }
  }

  private async onCreate(uri: vscode.Uri) {
    for (const store of storeList) {
      if (isMatch(uri.fsPath, `${baseGlob}/${store.pattern}`)) {
        await store.parse(uri);
        break;
      }
    }
  }

  private onDelete(uri: vscode.Uri) {
    for (const store of storeList) {
      if (isMatch(uri.fsPath, `${baseGlob}/${store.pattern}`)) {
        store.delete(uri);
        break;
      }
    }
  }
}
