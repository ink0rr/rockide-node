import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const testforblock: CommandInfo = {
  command: "testforblock",
  documentation: "Tests whether a certain block is in a specific location.",
  overloads: [
    {
      params: [
        ...Parameter.createPosition("position"),
        {
          // todo: dynamic block identifier
          value: ["tileName"],
          signatureValue: "<tileName>",
          type: ParamType.RockideBlock,
        },
        {
          value: "todoblockState",
          signatureValue: "[blockStates]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default testforblock;
