import { CommandInfo, ParamType } from "../types";

const scoreboard: CommandInfo = {
  command: "scoreboard",
  documentation: "Tracks and displays scores for various objectives.",
  overloads: [
    {
      params: [
        {
          value: ["objectives"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["add"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.keyword,
        },
        {
          value: ["dummy"],
          signatureValue: "<criteria>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[displayName]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["objectives"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["remove"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["objectives"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["list"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["objectives"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["setdisplay"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: ["list", "sidebar"],
          signatureValue: "<displaySlot>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "[objective]",
          type: ParamType.keyword,
        },
        {
          value: ["ascending", "descending"],
          signatureValue: "[sortOrder]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["objectives"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["setdisplay"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: ["belowname"],
          signatureValue: "<displaySlot>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "[objective]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["players"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["list"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "*",
          signatureValue: "[playername]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["players"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["reset"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "*",
          signatureValue: "<player>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "[objective]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["players"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["test"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "*",
          signatureValue: "<player>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.keyword,
        },
        {
          value: ["0", "1", "2"],
          signatureValue: "<min>",
          type: ParamType.keyword,
        },
        {
          value: ["0", "1", "2"],
          signatureValue: "[max]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["players"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["random"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "*",
          signatureValue: "<player>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<min>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<max>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["players"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["set", "add", "remove"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "*",
          signatureValue: "<player>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<count>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["players"],
          signatureValue: "<category>",
          type: ParamType.keyword,
        },
        {
          value: ["operation"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "*",
          signatureValue: "<targetName>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<targetObjective>",
          type: ParamType.keyword,
        },
        {
          value: ["%=", "*=", "+=", "-=", "/=", "<", "=", ">", "><"],
          signatureValue: "<operation>",
          type: ParamType.keyword,
        },
        {
          value: "*",
          signatureValue: "<selector>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default scoreboard;
