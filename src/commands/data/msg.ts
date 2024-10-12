import { CommandInfo, ParamType } from "../types";

const msg: CommandInfo = {
  command: "msg",
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
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default msg;
