import { CommandInfo, ParamType } from "../types";

const weather: CommandInfo = {
  command: "weather",
  documentation: "Sets the weather.",
  overloads: [
    {
      params: [
        {
          value: ["clear", "rain", "thunder"],
          signatureValue: "<type>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[duration]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["query"],
          signatureValue: "<query>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default weather;
