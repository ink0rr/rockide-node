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
          value: "name",
          signatureValue: "[name]",
          type: ParamType.RockideTickingarea,
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
          value: "name",
          signatureValue: "[name]",
          type: ParamType.RockideTickingarea,
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
          value: "name",
          signatureValue: "[name]",
          type: ParamType.RockideTickingarea,
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
          value: "name",
          signatureValue: "[name]",
          type: ParamType.RockideTickingarea,
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
