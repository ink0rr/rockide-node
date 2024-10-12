import { CommandInfo, ParamType } from "../types";

const tickingarea: CommandInfo = {
  command: "tickingarea",
  documentation: "Add, remove, or list ticking areas.",
  overloads: [
    {
      params: [
        {
          value: ["add"],
          signatureValue: "<mode>",
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
          value: "todo",
          signatureValue: "[name]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[preload]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["add"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["circle"],
          signatureValue: "<circle>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<center>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<radius>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[name]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[preload]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["remove"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<position>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["remove"],
          signatureValue: "<mode>",
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
          value: ["remove_all"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["list"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["all-dimensions"],
          signatureValue: "[all-dimensions]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["preload"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<position>",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[preload]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["preload"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[preload]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default tickingarea;
