import { CommandInfo, ParamType } from "../types";

const fog: CommandInfo = {
  command: "fog",
  documentation: "Add or remove fog settings file",
  overloads: [
    {
      params: [
        {
          value: "<target>",
          type: ParamType.playerSelector,
        },
        {
          value: ["push"],
          type: ParamType.keyword,
        },
        {
          // todo: dynamic fog id
          value: "<fogId>",
          type: ParamType.string,
        },
        {
          // todo: dynamic fog id
          value: "<userProvidedId>",
          type: ParamType.string,
        },
      ],
    },
    {
      params: [
        {
          value: "<target>",
          type: ParamType.playerSelector,
        },
        {
          value: ["pop", "remove"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          // todo: dynamic fog id
          value: "<userProvidedId>",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default fog;
