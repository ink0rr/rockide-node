import { CommandInfo, ParamType } from "../types";

const say: CommandInfo = {
  command: "say",
  documentation: "Sends a message in the chat to other players.",
  overloads: [
    {
      params: [
        {
          value: "string",
          signatureValue: "<message>",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default say;
