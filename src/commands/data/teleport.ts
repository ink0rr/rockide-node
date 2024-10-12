import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const teleport: CommandInfo = {
  command: "teleport",
  documentation: "Teleports entities (players, mobs, etc.).",
  overloads: [
    {
      params: [
        ...Parameter.createPosition("destination"),
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("destination"),
        ...Parameter.rotYX,
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("destination"),
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("lookAtPosition"),
        {
          value: ["true", "false"],
          signatureValue: "[checkForBlocks]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("destination"),
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<lookAtEntity>",
          type: ParamType.entitySelector,
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
          type: ParamType.entitySelector,
        },
        ...Parameter.createPosition("destination"),
        ...Parameter.rotYX,
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
          type: ParamType.entitySelector,
        },
        ...Parameter.createPosition("destination"),
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
          type: ParamType.entitySelector,
        },
        ...Parameter.createPosition("destination"),
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("lookAtPosition"),
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
          type: ParamType.entitySelector,
        },
        ...Parameter.createPosition("destination"),
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<lookAtEntity>",
          type: ParamType.entitySelector,
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
          type: ParamType.entitySelector,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<victim>",
          type: ParamType.entitySelector,
        },
        {
          value: "selector",
          signatureValue: "<destination>",
          type: ParamType.entitySelector,
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
export default teleport;
