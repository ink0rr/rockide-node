import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { baseGlob, projectGlob } from "./constants";
import { storeList } from "./store";

export class Rockide {
  async isMinecraftWorkspace() {
    for (const path of await vscode.workspace.findFiles("**/manifest.json")) {
      const file = await vscode.workspace.openTextDocument(path);
      const json = JSONC.parse(file.getText());
      if ("format_version" in json && "header" in json) {
        continue;
      }
      return false;
    }
    return true;
  }

  async scanWorkspace() {
    await vscode.window.withProgress(
      { title: "Indexing", location: vscode.ProgressLocation.Notification },
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

    context.subscriptions.push(
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
