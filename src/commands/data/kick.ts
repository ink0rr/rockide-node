import { CommandInfo, ParamType } from "../types";

const kick: CommandInfo = {
  command: "kick",
  documentation: "Kicks a player from the server.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<name>",
          type: ParamType.selector,
        },
        {
          value: "string",
          signatureValue: "<reason>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default kick;
