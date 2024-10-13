import * as vscode from "vscode";
import { Rockide } from "../../rockide";
import { CommandContext } from "../command_context";

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
