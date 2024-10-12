import { CommandInfo, ParamType } from "../types";

const tellraw: CommandInfo = {
  command: "tellraw",
  documentation: "Sends a JSON message to players.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<target>",
          type: ParamType.playerSelector,
        },
        {
          value: ["unknown_JSON_OBJECT"],
          signatureValue: "<raw json message>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default tellraw;
