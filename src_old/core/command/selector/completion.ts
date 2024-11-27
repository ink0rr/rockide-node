import * as vscode from "vscode";
import { Rockide } from "../../../rockide";
import { selectorData } from "./data";
import { SelectorType } from "./data/_types";

function getValue(rockide: Rockide, type: SelectorType): string | string[] {
  switch (type) {
    case SelectorType.PlayerName:
      return "playerName";
    case SelectorType.Number:
      return "0";
    case SelectorType.Float:
      return ["0", "0.5", "1", "5"];
    case SelectorType.Coordinate:
      return ["~", "~-1", "~1", "1", "-1"];
    case SelectorType.Gamemode:
      return ["survival", "creative", "adventure", "spectator", "0", "1", "2"];
    case SelectorType.Yaw:
      return ["-180", "-90", "0", "90"];
    case SelectorType.Pitch:
      return ["-90", "0", "90"];
    case SelectorType.RockideEntityFamily:
      return "todo";
    case SelectorType.RockideEntityProperty:
      return "{todo}";
    case SelectorType.RockideItemIdentifier:
      return "todo";
    case SelectorType.RockideObjective:
      return "todo";
    case SelectorType.RockideTag:
      return rockide.tags
        .values()
        .map((tag) => [tag, `!${tag}`])
        .flat()
        .concat('""');
    case SelectorType.RockideEntityIdentifier:
      return "todo";
    default:
      return "unhandled";
  }
}

export function selectorCompletion() {
  return selectorData.map(({ name, documentation }) => {
    const completion = new vscode.CompletionItem(name, vscode.CompletionItemKind.TypeParameter);
    completion.documentation = documentation;
    completion.insertText = name;
    return completion;
  });
}

export function selectorDataCompletion(param: string, rockide: Rockide) {
  const selectorValue = selectorData.find(({ name }) => name === param);
  if (!selectorValue) {
    return [];
  }

  const value = getValue(rockide, selectorValue.type);
  if (Array.isArray(value)) {
    return value.map((v) => {
      const completion = new vscode.CompletionItem(v, vscode.CompletionItemKind.TypeParameter);
      return completion;
    });
  } else {
    const completion = new vscode.CompletionItem(value, vscode.CompletionItemKind.TypeParameter);
    return [completion];
  }
}
