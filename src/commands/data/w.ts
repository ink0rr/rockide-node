import { CommandInfo, ParamType } from "../types";

const w: CommandInfo = {
  command: "w",
  documentation: "Sends a private message to one or more players.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<target>",
          type: ParamType.playerSelector,
        },
        {
          value: "string",
          signatureValue: "<message>",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default w;
