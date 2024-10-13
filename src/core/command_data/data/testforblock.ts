import { CommandInfo, ParamType } from "../types";

const testforblock: CommandInfo = {
  command: "testforblock",
  documentation: "Tests whether a certain block is in a specific location.",
  overloads: [
    {
      params: [
        {
          value: "position",
          signatureValue: "<position>",
          type: ParamType.keyword,
        },
        {
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "<tileName>",
          type: ParamType.enum,
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
