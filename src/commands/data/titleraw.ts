import { CommandInfo, ParamType } from "../types";

const titleraw: CommandInfo = {
  command: "titleraw",
  documentation: "Controls screen titles with JSON messages.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          value: ["clear"],
          signatureValue: "<clear>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          value: ["reset"],
          signatureValue: "<reset>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          value: ["title", "subtitle", "actionbar"],
          signatureValue: "<titleLocation>",
          type: ParamType.keyword,
        },
        {
          value: ["unknown_JSON_OBJECT"],
          signatureValue: "<raw json titleText>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          value: ["times"],
          signatureValue: "<times>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<fadeIn>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<stay>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<fadeOut>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default titleraw;
