import { CommandInfo, ParamType } from "../types";

const wsserver: CommandInfo = {
  command: "wsserver",
  documentation: "Attempts to connect to the websocket server on the provided URL.",
  overloads: [
    {
      params: [
        {
          value: ["unknown_RAWTEXT"],
          signatureValue: "<serverUri>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default wsserver;
