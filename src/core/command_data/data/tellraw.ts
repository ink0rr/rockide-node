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
          value: [
            JSON.stringify({ rawtext: [] }),
            JSON.stringify({ translate: "" }),
            JSON.stringify({ text: "" }),
            JSON.stringify({ with: [] }),
            JSON.stringify({ score: { name: "", objective: "" } }),
          ],
          documentation: [
            "Provides a raw-text equivalent of the current message.",
            "Provides a translation token where, if the client has an available resource in the players' language which matches the token, will get translated on the client.",
            "Provides a string literal value to use.",
            "Arguments for the translation token. Can be either an array of strings or RawMessage containing an array of raw text objects.",
            "Provides a token that will get replaced with the value of a score.",
          ],
          signatureValue: "<raw json message>",
          type: ParamType.rawJsonMessage,
        },
      ],
    },
  ],
};
export default tellraw;
