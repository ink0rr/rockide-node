import { CommandInfo, ParamType } from "../types";

const music: CommandInfo = {
  command: "music",
  documentation: "Allows you to control playing music tracks.",
  overloads: [
    {
      params: [
        {
          value: ["queue"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<trackName>",
          type: ParamType.string,
        },
        {
          value: "int",
          signatureValue: "[volume]",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[fadeSeconds]",
          type: ParamType.number,
        },
        {
          value: ["play_once", "loop"],
          signatureValue: "[repeatMode]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["play"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<trackName>",
          type: ParamType.string,
        },
        {
          value: "int",
          signatureValue: "[volume]",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[fadeSeconds]",
          type: ParamType.number,
        },
        {
          value: ["play_once", "loop"],
          signatureValue: "[repeatMode]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["stop"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[fadeSeconds]",
          type: ParamType.number,
        },
      ],
    },
    {
      params: [
        {
          value: ["volume"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<volume>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default music;
