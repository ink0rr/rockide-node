import { CommandInfo, ParamType } from "../types";

const playsound: CommandInfo = {
  command: "playsound",
  documentation: "Plays a sound.",
  overloads: [
    {
      params: [
        {
          value: "todo",
          signatureValue: "<sound>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "[player]",
          type: ParamType.selector,
        },
        {
          value: "position",
          signatureValue: "[position]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[volume]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[pitch]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[minimumVolume]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default playsound;
