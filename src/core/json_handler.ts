import * as JSONC from "jsonc-parser";
import * as vscode from "vscode";
import { NullNode } from "../constants";
import { isJsonPathMatch } from "../utils/jsonc";
import { Reference } from "./reference";

type JsonHandlerEntry = {
  path: string[];
  matchType?: "key" | "value";
  provideCompletion?: (context: JsonHandlerContext) => Reference[] | string[] | undefined;
  provideDefinition?: (context: JsonHandlerContext) => Reference[] | undefined;
  provideRename?: (context: JsonHandlerContext) => Reference[] | undefined;
};

export class JsonHandler {
  pattern;
  protected entries;
  constructor(pattern: string, entries: JsonHandlerEntry[]) {
    this.pattern = pattern;
    this.entries = entries.map((data) => ({ ...data, path: data.path.map((s) => s.split("/")) }));
  }
  findEntry(location: JSONC.Location) {
    for (const entry of this.entries) {
      if (
        (entry.matchType === "key" && !location.isAtPropertyKey) ||
        (entry.matchType === "value" && location.isAtPropertyKey)
      ) {
        continue;
      }
      for (const targetPath of entry.path) {
        if (isJsonPathMatch(location.path, targetPath)) {
          return entry;
        }
      }
    }
  }
}

export class JsonHandlerContext {
  uri: vscode.Uri;
  text: string;
  location: JSONC.Location;
  node: JSONC.Node;
  constructor(document: vscode.TextDocument, position: vscode.Position) {
    this.uri = document.uri;
    this.text = document.getText();
    this.location = JSONC.getLocation(this.text, document.offsetAt(position));
    this.node = this.location.previousNode ?? NullNode;
  }
  getParentNode(): JSONC.Node | undefined {
    const root = JSONC.parseTree(this.text);
    if (root) {
      const path = this.location.path;
      return JSONC.findNodeAtLocation(root, path.slice(0, path.length - 1));
    }
  }
  isAtPropertyKeyOrArray() {
    return this.location.isAtPropertyKey || typeof this.location.path.at(-1) === "number";
  }
}
