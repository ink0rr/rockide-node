import { CommandInfo, ParamType } from "../types";

const title: CommandInfo = {
  command: "title",
  documentation: "Controls screen titles.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.selector,
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
          type: ParamType.selector,
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
          type: ParamType.selector,
        },
        {
          value: ["title", "subtitle", "actionbar"],
          signatureValue: "<titleLocation>",
          type: ParamType.keyword,
        },
        {
          value: "string",
          signatureValue: "<titleText>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.selector,
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
export default title;
