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
          type: ParamType.selectorWildcard,
        },
        {
          value: ["add", "remove"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: ["todotag"],
          signatureValue: "<name>",
          type: ParamType.string,
        },
      ],
    },
    {
      params: [
        {
          value: "*",
          signatureValue: "<entity>",
          type: ParamType.selectorWildcard,
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
