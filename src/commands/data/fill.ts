import { blockIdentifier } from "../../literals/block_identifier";
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
          value: blockIdentifier,
          signatureValue: "<tileName>",
          type: ParamType.enum,
        },
        {
          value: "todo:blockState",
          type: ParamType.keyword,
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
          value: blockIdentifier,
          signatureValue: "<tileName>",
          type: ParamType.enum,
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
          value: blockIdentifier,
          signatureValue: "<tileName>",
          type: ParamType.enum,
        },
        {
          value: "todo:blockState",
          type: ParamType.keyword,
        },
        {
          value: ["replace"],
          type: ParamType.keyword,
        },
        {
          // todo: dynamic block identifier
          value: blockIdentifier,
          signatureValue: "<tileName>",
          type: ParamType.enum,
        },
        {
          value: "todo:blockState",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("from"),
        ...Parameter.createPosition("to"),
        {
          // todo: dynamic block identifier
          value: blockIdentifier,
          signatureValue: "<tileName>",
          type: ParamType.enum,
        },
        {
          value: ["replace"],
          type: ParamType.keyword,
        },
        {
          // todo: dynamic block identifier
          value: blockIdentifier,
          signatureValue: "<tileName>",
          type: ParamType.enum,
        },
        {
          value: "todo:blockState",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default fill;
