import { CommandInfo, ParamType } from "../types";

const spreadplayers: CommandInfo = {
  command: "spreadplayers",
  documentation: "Teleports entities to random locations.",
  overloads: [
    {
      params: [
        {
          value: "rot",
          signatureValue: "<x>",
          type: ParamType.keyword,
        },
        {
          value: "rot",
          signatureValue: "<z>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<spreadDistance>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<maxRange>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.selector,
        },
        {
          value: "rot",
          signatureValue: "[maxHeight]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default spreadplayers;
