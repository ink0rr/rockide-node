import * as JSONC from "jsonc-parser";
import * as vscode from "vscode";
import { Rockide } from "../../../rockide";
import { JsonContext } from "../../json/context";
import { CommandContext } from "../context";

export type CommandHandler = {
  pattern: string | string[];
  index?: boolean;
  process?(ctx: CommandContext, rockide: Rockide): CommandHandlerResult | void;
};

export type CommandHandlerResult = {
  completions?(): Array<string | vscode.CompletionItem>;
  definitions?(): Promise<vscode.LocationLink>[] | vscode.LocationLink[] | void;
  signature?(): vscode.SignatureHelp | undefined;
};

export type JsonCommandHandler = {
  pattern: string | string[];
  index?: boolean;
  semanticNode?(node: JSONC.Node): boolean;
  process?(jsonContext: JsonContext, commandContext: CommandContext, rockide: Rockide): JsonCommandHandlerResult | void;
};

export type JsonCommandHandlerResult = {
  completions?(): Array<string | vscode.CompletionItem>;
  definitions?(): Promise<vscode.LocationLink>[] | vscode.LocationLink[] | void;
  signature?(): vscode.SignatureHelp | undefined;
};
