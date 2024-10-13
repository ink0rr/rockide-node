import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const setblock: CommandInfo = {
  command: "setblock",
  documentation: "Changes a block to another block.",
  overloads: [
    {
      params: [
        ...Parameter.createPosition("location"),
        {
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "<tileName>",
          type: ParamType.keyword,
        },
        {
          value: "blockState",
          signatureValue: "<blockStates>",
          type: ParamType.keyword,
        },
        {
          value: ["replace", "destroy", "keep"],
          signatureValue: "[oldBlockHandling]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("location"),
        {
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "<tileName>",
          type: ParamType.keyword,
        },
        {
          value: ["replace", "destroy", "keep"],
          signatureValue: "[oldBlockHandling]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default setblock;
