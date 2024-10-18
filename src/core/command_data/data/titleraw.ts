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
          value: [
            JSON.stringify({ rawtext: [] }),
            JSON.stringify({ translate: "" }),
            JSON.stringify({ text: "" }),
            JSON.stringify({ with: [] }),
            JSON.stringify({ score: { name: "", objective: "" } }),
          ],
          documentation: [
            "Provides a raw-text equivalent of the current message.",
            "Provides a translation token where, if the client has an available resource in the players' language which matches the token, will get translated on the client.",
            "Provides a string literal value to use.",
            "Arguments for the translation token. Can be either an array of strings or RawMessage containing an array of raw text objects.",
            "Provides a token that will get replaced with the value of a score.",
          ],
          signatureValue: "<raw json message>",
          type: ParamType.rawJsonMessage,
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
export default titleraw;
