import * as vscode from "vscode";
import { Rockide } from "../../rockide";
import { CommandContext } from "./context";
import { selectorCompletion, selectorDataCompletion } from "./selector/completion";

export function commandCompletion(ctx: CommandContext, rockide: Rockide) {
  if (ctx.isCommment()) {
    return [];
  }

  // Handle selector
  const selector = ctx.getSelector();
  if (selector) {
    const { currentData } = selector;
    console.log(selector);
    if (!currentData.value && currentData.param) {
      return selectorDataCompletion(currentData.param, rockide);
    }
    return selectorCompletion();
  }

  let completions: vscode.CompletionItem[] = [];
  const commandSequences = ctx.getCommandSequences();

  if (!commandSequences.length) {
    return ctx.getDefaultCommandCompletions();
  }

  const currentCommand = commandSequences[commandSequences.length - 1];
  const overloads = currentCommand.overloads.filter(({ isMatch }) => isMatch);

  // Handle subcommand
  if (currentCommand.command === "execute") {
    const runArg = overloads[0].args[0];
    const subCommandArg = overloads[0].args[1];
    if (runArg.value === "run" && runArg.isMatch && !subCommandArg.isMatch) {
      return ctx.getDefaultCommandCompletions();
    }
  }

  for (const { args } of overloads) {
    const next = args.find(({ isMatch }) => !isMatch);
    if (!next) {
      continue;
    }
    const comps = next.createCompletion();
    completions.push(...(Array.isArray(comps) ? comps : [comps]));
  }

  completions = completions.filter((v, i, s) => s.findIndex((t) => t.label === v.label) === i);
  return completions;
}
