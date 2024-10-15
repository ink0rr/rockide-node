import * as vscode from "vscode";
import { Rockide } from "../../rockide";
import { CommandContext } from "../command_context";
import { commands } from "../command_data";

export function commandCompletion(ctx: CommandContext, rockide: Rockide): vscode.CompletionItem[] {
  // if (ctx.isCommment()) {
  //   return [];
  // }
  // const commandSequences = ctx.getCommands();
  // console.log(commandSequences);
  // if (!commandSequences.length) {
  //   return commands.map(({ command, documentation }) => {
  //     const completion = new vscode.CompletionItem(command, vscode.CompletionItemKind.Class);
  //     const markdown = new vscode.MarkdownString(`## ${command}\n\n${documentation}`);
  //     completion.documentation = markdown;
  //     return completion;
  //   });
  // }
  // for (const commandSequence of commandSequences) {
  //   const command = commands.find(({ command }) => command === commandSequence[commandSequence.length - 1]);
  //   if (!command) {
  //     // todo: diagnostics
  //     return [];
  //   }
  //   const { overloads } = command;
  //   if (!overloads) {
  //     return [];
  //   }
  //   if (commandSequence.length === 1) {
  //     return overloads
  //       .map(({ params }) => {
  //         if (!params.length) {
  //           return [];
  //         }
  //         return ctx.getParamCompletion(params[0]);
  //       })
  //       .flat()
  //       .filter((v, i, s) => i === s.findIndex((obj) => obj.label === v.label));
  //   }
  //   // return (
  //   //   ctx
  //   //     .getOverloads(command, commandSequence.slice(1))
  //   //     .map(({ params }) => {
  //   //       let index = commandSequence.length - 1;
  //   //       if (index >= params.length) {
  //   //         index = ((commandSequence.length - 1) % params.length) + 1;
  //   //       }
  //   //       const param = params[index];
  //   //       console.log(param, index);
  //   //       if (!param) {
  //   //         return [];
  //   //       }
  //   //       return ctx.getParamCompletion(param);
  //   //     })
  //   //     .flat()
  //   //     // .filter((v, i, s) => s.findIndex((obj) => obj.label === v.label) === i);
  //   //     .filter((v, i, s) => i === s.findIndex((obj) => obj.label === v.label))
  //   // );
  //   return ctx.getCompletionFromCommand(command, commandSequence.slice(1));
  // }
  rockide;
  if (ctx.isCommment()) {
    return [];
  }
  const commandSequences = ctx.getCommandsV2();
  if (!commandSequences.length) {
    return commands.map(({ command, documentation }) => {
      const completion = new vscode.CompletionItem(command, vscode.CompletionItemKind.Class);
      const markdown = new vscode.MarkdownString(`## ${command}\n\n${documentation}`);
      completion.documentation = markdown;
      return completion;
    });
  }
  const lastSeq = commandSequences[commandSequences.length - 1];
  const lastArg = lastSeq.args[lastSeq.args.length - 1];
  if (lastArg.value === "") {
  }
  return [];
}
