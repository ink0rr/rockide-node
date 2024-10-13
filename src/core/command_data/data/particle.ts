import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const particle: CommandInfo = {
  command: "particle",
  documentation: "Creates a particle emitter",
  overloads: [
    {
      params: [
        {
          value: "particle",
          signatureValue: "<effect>",
          type: ParamType.RockideParticle,
        },
        ...Parameter.createPosition("position"),
      ],
    },
  ],
};
export default particle;
