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
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[volume]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[fadeSeconds]",
          type: ParamType.keyword,
        },
        {
          value: ["play_once", "loop"],
          signatureValue: "[repeatMode]",
          type: ParamType.keyword,
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
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[volume]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[fadeSeconds]",
          type: ParamType.keyword,
        },
        {
          value: ["play_once", "loop"],
          signatureValue: "[repeatMode]",
          type: ParamType.keyword,
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
          type: ParamType.keyword,
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
