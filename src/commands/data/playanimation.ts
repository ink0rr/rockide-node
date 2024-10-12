import { CommandInfo, ParamType } from "../types";

const playanimation: CommandInfo = {
  command: "playanimation",
  documentation: "Makes one or more entities play a one-off animation. Assumes all variables are setup correctly.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: "todo",
          signatureValue: "<animation>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[next_state]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[blend_out_time]",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[stop_expression]",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[controller]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default playanimation;
