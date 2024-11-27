import { MarkdownString } from "vscode";

export type SelectorData = {
  name: string;
  type: SelectorType;
  documentation: string | MarkdownString;
};

export const enum SelectorType {
  PlayerName = "String",
  Number = "Number",
  Float = "Float",
  Coordinate = "Coordinate",
  Gamemode = "Gamemode",
  Yaw = "Yaw",
  Pitch = "Pitch",
  // Rockide specific
  RockideEntityFamily = "RockideEntityFamily",
  RockideEntityProperty = "RockideEntityProperty",
  RockideItemIdentifier = "RockideItemIdentifier",
  RockideObjective = "RockideObjective",
  RockideTag = "RockideTag",
  RockideEntityIdentifier = "RockideEntityIdentifier",
}
