import { CommandInfo, ParamType } from "../types";

const testfor: CommandInfo = {
  command: "testfor",
  documentation: "Counts entities (players, mobs, items, etc.) matching specified conditions.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.selector,
        },
      ],
    },
  ],
};
export default testfor;
