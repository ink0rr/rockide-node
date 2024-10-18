import { CommandInfo, ParamType } from "../types";

const script: CommandInfo = {
  command: "script",
  documentation: "Debugging options for GameTest Framework.",
  overloads: [
    {
      params: [
        {
          value: ["profiler"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["start"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["profiler"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["stop"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["watchdog"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["exportstats"],
          signatureValue: "<action>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default script;
