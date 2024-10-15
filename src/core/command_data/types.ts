import { MarkdownString } from "vscode";

export type CommandInfo = {
  command: string;
  overloads?: CommandSignature[];
  documentation?: string | MarkdownString;
};

export type CommandSignature = {
  params: ParamInfo[];
  documentation?: string | MarkdownString;
};

export type ParamInfo = {
  value: string | string[];
  signatureValue?: string;
  type: ParamType;
  required?: boolean;
  documentation?: string | MarkdownString | string[] | MarkdownString[];
};

export const enum ParamType {
  keyword = "keyword",
  enum = "enum",
  playerSelector = "playerSelector",
  entitySelector = "entitySelector",
  selectorWildcard = "selectorWildcard",
  scoreboardSelector = "scoreboardSelector",
  location = "location",
  tag = "tag",
  string = "string",
  number = "number",
  float = "float",
  vector3 = "vector3",
  yaw = "yaw",
  pitch = "pitch",
  executeChainedOption = "executeChainedOption",
  subcommand = "subcommand",
  itemNBT = "itemNBT",
  rawJsonMessage = "rawJsonMessage",
  xpLevel = "xpLevel",
  // rockide specific
  RockideLootTable = "RockideLootTable",
  RockideParticle = "RockideParticle",
  RockideClientAnimation = "RockideAnimation",
  RockideMcfunction = "RockideMcfunction",
  RockideMcstructure = "RockideMcstructure",
}
