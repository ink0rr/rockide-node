import { Parameter } from "../parameter";
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
          type: ParamType.string,
        },
        ...Parameter.createPosition("position"),
      ],
    },
  ],
};
export default particle;
