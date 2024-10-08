import * as vscode from "vscode";
import { RockideContext } from "../context";
import { Rockide } from "../rockide";

type Providers = vscode.CompletionItemProvider & vscode.DefinitionProvider;

export type RockideHandler = {
  pattern: string | string[];
  index?: "parse" | "path";
  process?(ctx: RockideContext, rockide: Rockide): RockideProcess | void;
} & Partial<Providers>;

export type RockideProcess = {
  completions?(): Array<string | vscode.CompletionItem>;
  definitions?(): Promise<vscode.LocationLink>[] | vscode.LocationLink[] | void;
};
