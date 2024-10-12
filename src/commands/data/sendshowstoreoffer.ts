import { CommandInfo, ParamType } from "../types";

const sendshowstoreoffer: CommandInfo = {
  command: "sendshowstoreoffer",
  documentation: "Sends a request to show a store offer to the target player.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.selector,
        },
        {
          value: ["marketplace", "character"],
          signatureValue: "<redirectType>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<offerId>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.selector,
        },
        {
          value: ["server"],
          signatureValue: "<redirectType>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default sendshowstoreoffer;
