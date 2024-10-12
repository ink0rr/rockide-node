import { CommandInfo, ParamType } from "../types";

const inputpermission: CommandInfo = {
  command: "inputpermission",
  documentation: "Sets whether or not a player's input can affect their character.",
  overloads: [
    {
      params: [
        {
          value: ["set"],
          signatureValue: "<option>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<targets>",
          type: ParamType.playerSelector,
        },
        {
          value: ["movement", "camera"],
          signatureValue: "<permission>",
          type: ParamType.enum,
        },
        {
          value: ["enabled", "disabled"],
          signatureValue: "<state>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["query"],
          signatureValue: "<option>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<targets>",
          type: ParamType.playerSelector,
        },
        {
          value: ["movement", "camera"],
          signatureValue: "<permission>",
          type: ParamType.enum,
        },
        {
          value: ["enabled", "disabled"],
          signatureValue: "[state]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default inputpermission;
