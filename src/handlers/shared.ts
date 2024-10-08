import { RockideContext } from "../context";
import { molangMath, molangNamespaces, molangQueries } from "../molang";

export function molangCompletions(ctx: RockideContext) {
  const { document, position } = ctx;
  const molangRange = document.getWordRangeAtPosition(position, /\b(q|query)\.(\w+)?/);
  if (molangRange) {
    const prefix = document.getText(molangRange)[1] === "." ? "q" : "query";
    return molangQueries.map((query) => `${prefix}.${query}`);
  }
  const mathRange = document.getWordRangeAtPosition(position, /\bmath\.(\w+)?/);
  if (mathRange) {
    return molangMath;
  }
  return molangNamespaces;
}
