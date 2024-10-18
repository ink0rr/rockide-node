import { CommandInfo, ParamType } from "../types";

const tell: CommandInfo = {
  command: "tell",
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
          value: ['"Hello world!"'],
          signatureValue: "<message>",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default tell;
