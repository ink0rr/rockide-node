import { CommandInfo, ParamType } from "../types";

const tag: CommandInfo = {
  command: "tag",
  documentation: "Manages tags stored in entities.",
  overloads: [
    {
      params: [
        {
          value: "*",
          signatureValue: "<entity>",
          type: ParamType.keyword,
        },
        {
          value: ["add", "remove"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<name>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "*",
          signatureValue: "<entity>",
          type: ParamType.keyword,
        },
        {
          value: ["list"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default tag;
