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
          type: ParamType.entitySelector,
        },
        {
          value: "todo",
          signatureValue: "<animation>",
          type: ParamType.RockideClientAnimation,
        },
        {
          value: "todo",
          signatureValue: "[next_state]",
          type: ParamType.string,
        },
        {
          value: "int",
          signatureValue: "[blend_out_time]",
          type: ParamType.float,
        },
        {
          value: "todo",
          signatureValue: "[stop_expression]",
          type: ParamType.string,
        },
        {
          value: "todo",
          signatureValue: "[controller]",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default playanimation;
