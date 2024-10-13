import { CommandInfo, ParamType } from "../types";

const time: CommandInfo = {
  command: "time",
  documentation: "Changes or queries the world's game time.",
  overloads: [
    {
      params: [
        {
          value: ["add"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<amount>",
          type: ParamType.number,
        },
      ],
    },
    {
      params: [
        {
          value: ["set"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<amount>",
          type: ParamType.number,
        },
      ],
    },
    {
      params: [
        {
          value: ["set"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["day", "sunrise", "noon", "sunset", "night", "midnight"],
          signatureValue: "<time>",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["query"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["daytime", "gametime", "day"],
          signatureValue: "<time>",
          type: ParamType.enum,
        },
      ],
    },
  ],
};
export default time;
