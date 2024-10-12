import { CommandInfo, ParamType } from "../types";

const tp: CommandInfo = {
  command: "tp",
  documentation: "Teleports entities (players, mobs, etc.).",
  overloads: [
    {
      params: [
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
        {
          value: "rot",
          signatureValue: "[yRot]",
          type: ParamType.keyword,
        },
        {
          value: "rot",
          signatureValue: "[xRot]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<lookAtPosition>",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<lookAtEntity>",
          type: ParamType.playerSelector,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.playerSelector,
        },
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
        {
          value: "rot",
          signatureValue: "[yRot]",
          type: ParamType.keyword,
        },
        {
          value: "rot",
          signatureValue: "[xRot]",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.playerSelector,
        },
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.playerSelector,
        },
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<lookAtPosition>",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.playerSelector,
        },
        {
          value: "position",
          signatureValue: "<destination>",
          type: ParamType.keyword,
        },
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<lookAtEntity>",
          type: ParamType.playerSelector,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<destination>",
          type: ParamType.playerSelector,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.playerSelector,
        },
        {
          value: "selector",
          signatureValue: "<destination>",
          type: ParamType.playerSelector,
        },
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default tp;
