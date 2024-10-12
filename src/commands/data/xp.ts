import { CommandInfo, ParamType } from "../types";

const xp: CommandInfo = {
  command: "xp",
  documentation: "Adds or removes player experience.",
  overloads: [
    {
      params: [
        {
          value: "int",
          signatureValue: "<amount>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "[player]",
          type: ParamType.playerSelector,
        },
      ],
    },
    {
      params: [
        {
          value: ["20", "20L"],
          signatureValue: "<amount>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "[player]",
          type: ParamType.playerSelector,
        },
      ],
    },
  ],
};
export default xp;
