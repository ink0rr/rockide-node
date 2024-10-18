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
          type: ParamType.string,
        },
        {
          value: "int",
          signatureValue: "[rotationSteps]",
          type: ParamType.number,
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
          type: ParamType.string,
        },
        {
          value: ["true", "false"],
          signatureValue: "<stopOnFailure>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "<repeatCount>",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[rotationSteps]",
          type: ParamType.number,
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
          type: ParamType.string,
        },
        {
          value: "int",
          signatureValue: "[rotationSteps]",
          type: ParamType.number,
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
          type: ParamType.string,
        },
        {
          value: "int",
          signatureValue: "[rotationSteps]",
          type: ParamType.number,
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
          value: "testName",
          signatureValue: "<testName>",
          type: ParamType.string,
        },
        {
          value: "int",
          signatureValue: "[width]",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[height]",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[depth]",
          type: ParamType.number,
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
