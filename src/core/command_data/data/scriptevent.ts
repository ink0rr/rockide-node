import { CommandInfo, ParamType } from "../types";

const scriptevent: CommandInfo = {
  command: "scriptevent",
  documentation: "Triggers a script event with an ID and message.",
  overloads: [
    {
      params: [
        {
          value: "id",
          signatureValue: "<messageId>",
          type: ParamType.string,
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
export default scriptevent;
