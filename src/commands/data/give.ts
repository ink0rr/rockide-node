import { CommandInfo, ParamType } from "../types";

const give: CommandInfo = {
  command: "give",
  documentation: "Gives an item to a player.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "<itemName>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.keyword,
        },
        {
          value: ["unknown_JSON_OBJECT"],
          signatureValue: "[components]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default give;
