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
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<from>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<to>",
          type: ParamType.keyword,
        },
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
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<from>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<to>",
          type: ParamType.keyword,
        },
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
          type: ParamType.keyword,
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
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<to>",
          type: ParamType.keyword,
        },
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
          value: "int",
          signatureValue: "[integrity]",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[seed]",
          type: ParamType.keyword,
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
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<to>",
          type: ParamType.keyword,
        },
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
          value: "int",
          signatureValue: "[animationSeconds]",
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
          value: "int",
          signatureValue: "[integrity]",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[seed]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default structure;
