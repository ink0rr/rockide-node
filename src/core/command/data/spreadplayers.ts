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
          type: ParamType.float,
        },
        {
          value: "rot",
          signatureValue: "<z>",
          type: ParamType.float,
        },
        {
          value: "int",
          signatureValue: "<spreadDistance>",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "<maxRange>",
          type: ParamType.number,
        },
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.playerSelector,
        },
        {
          value: "rot",
          signatureValue: "[maxHeight]",
          type: ParamType.number,
        },
      ],
    },
  ],
};
export default spreadplayers;
