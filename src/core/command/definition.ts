import { Rockide } from "../../rockide";
import { CommandContext, CommandSequence } from "./context_n";
import { ParamType } from "./types";

type DefinitionParameter = {
  ctx: CommandContext;
  commandSequences: CommandSequence[];
  rockide: Rockide;
};

function mcfunction({ commandSequences, rockide, ctx }: DefinitionParameter) {
  const mcfunctions = Array.from(rockide.getMcfunctions());
  const currentCommand = commandSequences[commandSequences.length - 1];
  const overload = currentCommand.overloads.find(({ isMatch }) => isMatch);
  if (!overload) {
    return;
  }
  const word = ctx.getCurrentWord();
  if (!word) {
    return;
  }
  const { range, text } = word;
  const path = mcfunctions.find((path) => path.endsWith(`${text}.mcfunction`));
  if (!path) {
    return;
  }
  return overload.args
    .filter((arg) => arg.type === ParamType.RockideMcfunction)
    .map(() => ctx.createDefinition(path, range));
}

export function commandDefinitions(ctx: CommandContext, rockide: Rockide) {
  const commandSequences = ctx.getCommandSequences();
  if (!commandSequences.length) {
    return;
  }

  const functionDefs = mcfunction({ commandSequences, rockide, ctx });
  return functionDefs;
}
