import { Parameter } from "../parameter";
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
        ...Parameter.createPosition("from"),
        ...Parameter.createPosition("to"),
        {
          // todo: dynamic if possible
          value: "todo",
          signatureValue: "[name]",
          type: ParamType.string,
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
        ...Parameter.createPosition("center"),
        {
          value: "int",
          signatureValue: "<radius>",
          type: ParamType.number,
        },
        {
          // todo: dynamic if possible
          value: "todo",
          signatureValue: "[name]",
          type: ParamType.string,
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
        ...Parameter.createPosition("position"),
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
          // todo: dynamic if possible
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.string,
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
        ...Parameter.createPosition("position"),
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
          // todo: dynamic if possible
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.string,
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
