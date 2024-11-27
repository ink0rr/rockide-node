import * as vscode from "vscode";
import { Reference } from "./reference";
import { Store } from "./store";

export class BehaviorPathStore extends Store<"path"> {
  pattern;
  protected store;
  constructor(pattern: string) {
    super();
    this.pattern = pattern;
    this.store = new Map<string, Reference[]>();
  }
  parse(uri: vscode.Uri): void {
    const data = this.get("path");
    const path = vscode.workspace.asRelativePath(uri).split(/(behavior_pack|[^\\/]*?bp|bp_[^\\/]*?)\//i)[2];
    data.push({ value: path, uri });
    this.store.set("path", data);
  }
}

export class ResourcePathStore extends Store<"path"> {
  pattern;
  protected store;
  constructor(pattern: string) {
    super();
    this.pattern = pattern;
    this.store = new Map<string, Reference[]>();
  }
  parse(uri: vscode.Uri): void {
    const data = this.get("path");
    const path = vscode.workspace
      .asRelativePath(uri)
      .split(/(resource_pack|[^\\/]*?rp|rp_[^\\/]*?)\//i)[2]
      .replace(/\.\w+$/, "");
    data.push({ value: path, uri });
    this.store.set("path", data);
  }
}
