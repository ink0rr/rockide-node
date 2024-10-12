import { CommandInfo, ParamType } from "../types";

const stopsound: CommandInfo = {
  command: "stopsound",
  documentation: "Stops a sound.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          value: "todo",
          signatureValue: "[sound]",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default stopsound;
