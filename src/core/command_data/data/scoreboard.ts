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
          type: ParamType.string,
        },
        {
          value: ["dummy"],
          signatureValue: "<criteria>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[displayName]",
          type: ParamType.string,
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
          type: ParamType.string,
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
          type: ParamType.string,
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
          type: ParamType.string,
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
          type: ParamType.scoreboardSelector,
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
          type: ParamType.scoreboardSelector,
        },
        {
          value: [],
          signatureValue: "[objective]",
          type: ParamType.string,
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
          type: ParamType.scoreboardSelector,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.string,
        },
        {
          value: ["0", "1", "2"],
          signatureValue: "<min>",
          type: ParamType.number,
        },
        {
          value: ["0", "1", "2"],
          signatureValue: "[max]",
          type: ParamType.number,
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
          type: ParamType.scoreboardSelector,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.string,
        },
        {
          value: ["0"],
          signatureValue: "<min>",
          type: ParamType.number,
        },
        {
          value: ["10"],
          signatureValue: "<max>",
          type: ParamType.number,
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
          type: ParamType.scoreboardSelector,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.string,
        },
        {
          value: "int",
          signatureValue: "<count>",
          type: ParamType.number,
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
          type: ParamType.scoreboardSelector,
        },
        {
          value: [],
          signatureValue: "<targetObjective>",
          type: ParamType.string,
        },
        {
          value: ["%=", "*=", "+=", "-=", "/=", "<", "=", ">", "><"],
          signatureValue: "<operation>",
          type: ParamType.keyword,
        },
        {
          value: "*",
          signatureValue: "<selector>",
          type: ParamType.scoreboardSelector,
        },
        {
          value: [],
          signatureValue: "<objective>",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default scoreboard;
