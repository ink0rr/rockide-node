import { CommandInfo, ParamType } from "../types";

const testforblocks: CommandInfo = {
  command: "testforblocks",
  documentation: "Tests whether the blocks in two regions match.",
  overloads: [
    {
      params: [
        {
          value: "position",
          signatureValue: "<begin>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<end>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
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
