import { Parameter } from "../parameter";
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
          type: ParamType.string,
        },
        {
          value: "selector",
          signatureValue: "[player]",
          type: ParamType.playerSelector,
        },
        ...Parameter.createPosition("position"),
        {
          value: "int",
          signatureValue: "[volume]",
          type: ParamType.float,
        },
        {
          value: "int",
          signatureValue: "[pitch]",
          type: ParamType.float,
        },
        {
          value: "int",
          signatureValue: "[minimumVolume]",
          type: ParamType.float,
        },
      ],
    },
  ],
};
export default playsound;
