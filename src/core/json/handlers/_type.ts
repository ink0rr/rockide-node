import * as vscode from "vscode";
import { Rockide } from "../../../rockide";
import { JsonContext } from "../context";

export type JsonHandler = {
  pattern: string | string[];
  index?: "parse" | "path";
  process?(ctx: JsonContext, rockide: Rockide): JsonHandlerResult | void;
};

export type JsonHandlerResult = {
  completions?(): Array<string | vscode.CompletionItem>;
  definitions?(): Promise<vscode.LocationLink>[] | vscode.LocationLink[] | void;
  signature?(): vscode.SignatureHelp | undefined;
};
