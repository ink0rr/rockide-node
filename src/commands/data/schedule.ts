import { CommandInfo, ParamType } from "../types";

const schedule: CommandInfo = {
  command: "schedule",
  documentation: "Schedules an action to be executed once an area is loaded, or after a certain amount of time.",
  overloads: [
    {
      params: [
        {
          value: ["on_area_loaded"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["add"],
          signatureValue: "<condition>",
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
          value: "mcfunctionPath",
          signatureValue: "<function>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["on_area_loaded"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["add"],
          signatureValue: "<condition>",
          type: ParamType.keyword,
        },
        {
          value: ["circle"],
          signatureValue: "<type>",
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
          value: "mcfunctionPath",
          signatureValue: "<function>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["on_area_loaded"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["add"],
          signatureValue: "<condition>",
          type: ParamType.keyword,
        },
        {
          value: ["tickingarea"],
          signatureValue: "<type>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<name>",
          type: ParamType.keyword,
        },
        {
          value: "mcfunctionPath",
          signatureValue: "<function>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default schedule;
