import { CommandInfo, ParamType } from "../types";

const scriptevent: CommandInfo = {
  command: "scriptevent",
  documentation: "Triggers a script event with an ID and message.",
  overloads: [
    {
      params: [
        {
          value: "todo",
          signatureValue: "<messageId>",
          type: ParamType.keyword,
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
export default scriptevent;
