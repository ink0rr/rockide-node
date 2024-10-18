import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const testforblocks: CommandInfo = {
  command: "testforblocks",
  documentation: "Tests whether the blocks in two regions match.",
  overloads: [
    {
      params: [
        ...Parameter.createPosition("begin"),
        ...Parameter.createPosition("end"),
        ...Parameter.createPosition("destination"),
        {
          value: ["masked", "all"],
          signatureValue: "[mode]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default testforblocks;
