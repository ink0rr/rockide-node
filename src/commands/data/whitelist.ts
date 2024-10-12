import { CommandInfo, ParamType } from "../types";

const whitelist: CommandInfo = {
  command: "whitelist",
  documentation: "Manages the server allowlist.",
  overloads: [
    {
      params: [
        {
          value: ["add", "remove", "list", "reload", "on", "off"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[name]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default whitelist;
