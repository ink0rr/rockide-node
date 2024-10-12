import { CommandInfo, ParamType } from "../types";

const particle: CommandInfo = {
  command: "particle",
  documentation: "Creates a particle emitter",
  overloads: [
    {
      params: [
        {
          value: "todo",
          signatureValue: "<effect>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "[position]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default particle;
