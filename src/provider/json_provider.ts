import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { JsonHandlerContext } from "../core/json_handler";
import { Reference } from "../core/reference";
import { handlerList } from "../handler";

export class JsonProvider implements vscode.CompletionItemProvider, vscode.DefinitionProvider, vscode.RenameProvider {
  private findHandler(document: vscode.TextDocument) {
    return handlerList.find((handler) => isMatch(document.uri.fsPath, handler.pattern));
  }

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.CompletionItem[]> {
    const handler = this.findHandler(document);
    if (!handler) {
      return;
    }
    const context = new JsonHandlerContext(document, position);
    const entry = handler.findEntry(context.location);
    const data = entry?.provideCompletion?.(context);
    if (!data) {
      return;
    }
    return [...new Set(data.map((v) => (v instanceof Reference ? v.value : v)))].map((value) => {
      const completion = new vscode.CompletionItem(value);
      completion.range = new vscode.Range(
        document.positionAt(context.node.offset + 1),
        document.positionAt(context.node.offset + context.node.length - 1),
      );
      return completion;
    });
  }

  provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.DefinitionLink[]> {
    const handler = this.findHandler(document);
    if (!handler) {
      return;
    }
    const context = new JsonHandlerContext(document, position);
    const entry = handler.findEntry(context.location);
    return entry
      ?.provideDefinition?.(context)
      ?.filter(({ value }) => value === context.node.value)
      .map(({ range, uri }) => {
        const originSelectionRange = new vscode.Range(
          document.positionAt(context.node.offset),
          document.positionAt(context.node.offset + context.node.length),
        );
        return {
          originSelectionRange,
          targetRange: range ?? new vscode.Range(0, 0, 0, 0),
          targetUri: uri,
        };
      });
  }

  provideRenameEdits(
    document: vscode.TextDocument,
    position: vscode.Position,
    newName: string,
  ): vscode.ProviderResult<vscode.WorkspaceEdit> {
    const handler = this.findHandler(document);
    if (!handler) {
      return;
    }
    const context = new JsonHandlerContext(document, position);
    const entry = handler.findEntry(context.location);
    const edit = new vscode.WorkspaceEdit();
    entry
      ?.provideRename?.(context)
      ?.filter(({ value }) => value === context.node.value)
      .forEach(({ range, uri }) => {
        if (!range) {
          console.warn(`Trying to rename unsupported type: ${handler.pattern}`);
          return;
        }
        // Exclude quotes
        range = new vscode.Range(range.start.translate(0, 1), range.end.translate(0, -1));
        edit.replace(uri, range, newName);
      });
    if (edit.size > 0) {
      return edit;
    }
  }

  prepareRename(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<{ range: vscode.Range; placeholder: string }> {
    const offset = document.offsetAt(position);
    const location = JSONC.getLocation(document.getText(), offset);
    const node = location.previousNode;
    if (!node || typeof node.value !== "string") {
      return;
    }
    return {
      range: new vscode.Range(document.positionAt(node.offset + 1), document.positionAt(node.offset + node.length - 1)),
      placeholder: node.value,
    };
  }
}
