import * as JSONC from "jsonc-parser";
import * as vscode from "vscode";
import { findNodesAtPath } from "../utils/jsonc";
import { JsonReference } from "./json_reference";
import { Reference } from "./reference";
import { Store } from "./store";

type JsonStoreEntry<T extends string> = {
  id: T;
  path: string[];
  /**
   * Function to transform the value of the node. If the function returns null, the value will be ignored.
   */
  transform?: (node: JSONC.Node) => string | null;
};

export class JsonStore<T extends string> extends Store<T> {
  pattern;
  protected store;
  private entries;
  constructor(pattern: string, entries: JsonStoreEntry<T>[]) {
    super();
    this.pattern = pattern;
    this.store = new Map<string, Reference[]>();
    this.entries = entries.map((entry) => ({
      ...entry,
      path: entry.path.map((path) => path.split("/")),
    }));
  }
  async parse(uri: vscode.Uri): Promise<void> {
    const document = await vscode.workspace.openTextDocument(uri);
    const root = JSONC.parseTree(document.getText());
    if (!root) {
      return;
    }
    for (const entry of this.entries) {
      const data = this.store.get(entry.id) ?? [];
      for (const path of entry.path) {
        // If the last path is "*", we want to grab the values instead of keys
        const index = path[path.length - 1] === "*" ? 1 : 0;
        const extract = (node: JSONC.Node) => {
          if (node.type === "string") {
            const value = entry.transform?.(node);
            if (value !== null) {
              data.push(new JsonReference(document, node, value));
            }
          } else if (node.type === "property" && node.children?.[index]) {
            const value = entry.transform?.(node.children[index]);
            if (value !== null) {
              data.push(new JsonReference(document, node.children[index], value));
            }
          } else if (node.children) {
            for (const child of node.children) {
              extract(child);
            }
          }
        };
        for (const node of findNodesAtPath(root, path)) {
          extract(node);
        }
      }
      this.store.set(entry.id, data);
    }
  }
}
