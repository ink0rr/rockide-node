import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const structure: CommandInfo = {
  command: "structure",
  documentation: "Saves or loads a structure in the world.",
  overloads: [
    {
      params: [
        {
          value: ["save"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.string,
        },
        ...Parameter.createPosition("from"),
        ...Parameter.createPosition("to"),
        {
          value: ["disk", "memory"],
          signatureValue: "[saveMode]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["save"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.string,
        },
        ...Parameter.createPosition("from"),
        ...Parameter.createPosition("to"),
        {
          value: ["true", "false"],
          signatureValue: "[includeEntities]",
          type: ParamType.keyword,
        },
        {
          value: ["disk", "memory"],
          signatureValue: "[saveMode]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[includeBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["delete"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.string,
        },
      ],
    },
    {
      params: [
        {
          value: ["load"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.string,
        },
        ...Parameter.createPosition("to"),
        {
          value: ["0_degrees", "90_degrees", "180_degrees", "270_degrees"],
          signatureValue: "[rotation]",
          type: ParamType.keyword,
        },
        {
          value: ["x", "z", "none", "xz"],
          signatureValue: "[mirror]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[includeEntities]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[includeBlocks]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[waterlogged]",
          type: ParamType.keyword,
        },
        {
          value: Array.from({ length: 11 }).map((_, i) => `${10 * i}`),
          signatureValue: "[integrity]",
          type: ParamType.float,
        },
        {
          value: "todo",
          signatureValue: "[seed]",
          type: ParamType.string,
        },
      ],
    },
    {
      params: [
        {
          value: ["load"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.string,
        },
        ...Parameter.createPosition("to"),
        {
          value: ["0_degrees", "90_degrees", "180_degrees", "270_degrees"],
          signatureValue: "[rotation]",
          type: ParamType.keyword,
        },
        {
          value: ["x", "z", "none", "xz"],
          signatureValue: "[mirror]",
          type: ParamType.keyword,
        },
        {
          value: ["block_by_block", "layer_by_layer"],
          signatureValue: "[animationMode]",
          type: ParamType.keyword,
        },
        {
          value: Array.from({ length: 11 }).map((_, i) => `${i / 10}`),
          signatureValue: "[animationSeconds]",
          type: ParamType.float,
        },
        {
          value: ["true", "false"],
          signatureValue: "[includeEntities]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[includeBlocks]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[waterlogged]",
          type: ParamType.keyword,
        },
        {
          value: Array.from({ length: 11 }).map((_, i) => `${10 * i}`),
          signatureValue: "[integrity]",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[seed]",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default structure;
