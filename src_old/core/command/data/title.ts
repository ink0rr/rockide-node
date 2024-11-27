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
          value: "string",
          signatureValue: "<titleText>",
          type: ParamType.string,
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
          type: ParamType.float,
        },
        {
          value: "int",
          signatureValue: "<stay>",
          type: ParamType.float,
        },
        {
          value: "int",
          signatureValue: "<fadeOut>",
          type: ParamType.float,
        },
      ],
    },
  ],
};
export default title;
