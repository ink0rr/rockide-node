import { CommandInfo, ParamType } from "../types";

const permission: CommandInfo = {
  command: "permission",
  documentation: "Reloads and applies permissions.",
  overloads: [
    {
      params: [
        {
          value: ["list", "reload"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default permission;
