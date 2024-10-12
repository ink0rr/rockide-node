import { CommandInfo, ParamType } from "../types";

const transfer: CommandInfo = {
  command: "transfer",
  documentation: "Transfers a player to another server.",
  overloads: [
    {
      params: [
        {
          value: "todo",
          signatureValue: "<pfidOrMSA>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<server>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<port>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default transfer;
