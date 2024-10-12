import { CommandInfo, ParamType } from "../types";

const gametest: CommandInfo = {
  command: "gametest",
  documentation: "Interacts with gametest.",
  overloads: [
    {
      params: [
        {
          value: ["runthis"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["run"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<testName>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[rotationSteps]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["run"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "<testName>",
          type: ParamType.keyword,
        },
        {
          value: ["true", "false"],
          signatureValue: "<stopOnFailure>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<repeatCount>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[rotationSteps]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["runset"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "[tag]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[rotationSteps]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["runsetuntilfail"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: [],
          signatureValue: "[tag]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[rotationSteps]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["clearall"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["pos"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["create"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<testName>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[width]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[height]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[depth]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["runthese"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["stopall"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default gametest;
