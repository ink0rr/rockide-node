import { blockIdentifier } from "../../../literals/block_identifier";
import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const execute: CommandInfo = {
  command: "execute",
  documentation: "Executes a command on behalf of one or more entities.",
  overloads: [
    {
      params: [
        {
          value: ["as"],
          type: ParamType.keyword,
        },
        {
          value: "<origin>",
          type: ParamType.entitySelector,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["at"],
          type: ParamType.keyword,
        },
        {
          value: "<origin>",
          type: ParamType.entitySelector,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["in"],
          type: ParamType.keyword,
        },
        {
          value: ["overworld", "nether", "the_end"],
          signatureValue: "<dimension>",
          type: ParamType.keyword,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["positioned"],
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("position"),
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["positioned"],
          type: ParamType.keyword,
        },
        {
          value: ["as"],
          type: ParamType.keyword,
        },
        {
          value: "<origin>",
          type: ParamType.entitySelector,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["rotated"],
          type: ParamType.keyword,
        },
        ...Parameter.rotYX,
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["rotated"],
          type: ParamType.keyword,
        },
        {
          value: ["as"],
          type: ParamType.keyword,
        },
        {
          value: "<origin>",
          type: ParamType.entitySelector,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["facing"],
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("lookAtPosition"),
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["facing"],
          type: ParamType.keyword,
        },
        {
          value: ["entity"],
          type: ParamType.keyword,
        },
        {
          value: "<origin>",
          type: ParamType.entitySelector,
        },
        {
          value: ["eyes", "feet"],
          signatureValue: "<anchor>",
          type: ParamType.keyword,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["align"],
          type: ParamType.keyword,
        },
        {
          value: ["x", "y", "z", "xy", "xz", "yz", "xyz"],
          signatureValue: "<axes>",
          type: ParamType.enum,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["anchored"],
          type: ParamType.keyword,
        },
        {
          value: ["eyes", "feet"],
          signatureValue: "<anchor>",
          type: ParamType.keyword,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["if", "unless"],
          type: ParamType.keyword,
        },
        {
          value: ["block"],
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("position"),
        {
          value: "<blockIdentifier>",
          type: ParamType.RockideBlock,
        },
        {
          value: "blockState",
          type: ParamType.RockideBlockState,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["if", "unless"],
          type: ParamType.keyword,
        },
        {
          value: "<blockIdentifier>",
          type: ParamType.RockideBlock,
        },
        ...Parameter.createPosition("position"),
        {
          value: blockIdentifier,
          signatureValue: "<block>",
          type: ParamType.enum,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["if", "unless"],
          type: ParamType.keyword,
        },
        {
          value: "<blockIdentifier>",
          type: ParamType.RockideBlock,
        },
        ...Parameter.createPosition("position"),
        {
          value: ["masked", "all"],
          signatureValue: "<scanMode>",
          type: ParamType.keyword,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["if", "unless"],
          type: ParamType.keyword,
        },
        {
          value: ["entity"],
          type: ParamType.keyword,
        },
        {
          value: "<target>",
          type: ParamType.entitySelector,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["if", "unless"],
          type: ParamType.keyword,
        },
        {
          value: ["score"],
          type: ParamType.keyword,
        },
        {
          value: "<target>",
          type: ParamType.selectorWildcard,
        },
        {
          value: [],
          signatureValue: "targetObjective",
          type: ParamType.RockideScoreboardObjective,
        },
        {
          value: ["%=", "*=", "+=", "-=", "/=", "<", "=", ">", "><"],
          signatureValue: "<operation>",
          type: ParamType.scoreboardOperation,
        },
        {
          value: "<source>",
          type: ParamType.selectorWildcard,
        },
        {
          value: [],
          signatureValue: "targetObjective",
          type: ParamType.RockideScoreboardObjective,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["if", "unless"],
          type: ParamType.keyword,
        },
        {
          value: ["score"],
          type: ParamType.keyword,
        },
        {
          value: "<target>",
          type: ParamType.selectorWildcard,
        },
        {
          value: [],
          signatureValue: "targetObjective",
          type: ParamType.RockideScoreboardObjective,
        },
        {
          value: ["matches"],
          type: ParamType.keyword,
        },
        {
          value: "0..10",
          signatureValue: "<value>",
          type: ParamType.range,
        },
        {
          value: ["chainedCommand"],
          type: ParamType.executeChainedOption,
        },
      ],
    },
    {
      params: [
        {
          value: ["run"],
          type: ParamType.keyword,
        },
        {
          value: ["subcommand"],
          type: ParamType.subcommand,
        },
      ],
    },
  ],
};
export default execute;
