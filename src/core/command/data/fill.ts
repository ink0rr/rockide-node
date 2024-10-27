import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const fill: CommandInfo = {
  command: "fill",
  documentation: "Fills all or parts of a region with a specific block.",
  overloads: [
    {
      params: [
        ...Parameter.createPosition("from"),
        ...Parameter.createPosition("to"),
        {
          // todo: dynamic block identifier
          value: [],
          signatureValue: "<tileName>",
          type: ParamType.RockideBlock,
        },
        {
          value: "todo:blockState",
          type: ParamType.RockideBlockState,
        },
        {
          value: ["outline", "hollow", "destroy", "keep"],
          signatureValue: "<oldBlockHandling>",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("from"),
        ...Parameter.createPosition("to"),
        {
          // todo: dynamic block identifier
          value: [],
          signatureValue: "<tileName>",
          type: ParamType.RockideBlock,
        },
        {
          value: ["outline", "hollow", "destroy", "keep"],
          signatureValue: "<oldBlockHandling>",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("from"),
        ...Parameter.createPosition("to"),
        {
          // todo: dynamic block identifier
          value: [],
          signatureValue: "<tileName>",
          type: ParamType.RockideBlock,
        },
        {
          value: "todo:blockState",
          type: ParamType.RockideBlockState,
        },
        {
          value: ["replace"],
          type: ParamType.keyword,
        },
        {
          // todo: dynamic block identifier
          value: [],
          signatureValue: "<tileName>",
          type: ParamType.RockideBlock,
        },
        {
          value: "todo:blockState",
          type: ParamType.RockideBlockState,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("from"),
        ...Parameter.createPosition("to"),
        {
          // todo: dynamic block identifier
          value: [],
          signatureValue: "<tileName>",
          type: ParamType.RockideBlock,
        },
        {
          value: ["replace"],
          type: ParamType.keyword,
        },
        {
          // todo: dynamic block identifier
          value: [],
          signatureValue: "<tileName>",
          type: ParamType.RockideBlock,
        },
        {
          value: "todo:blockState",
          type: ParamType.RockideBlockState,
        },
      ],
    },
  ],
};
export default fill;
