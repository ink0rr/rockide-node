import { CommandInfo, ParamType } from "../types";

const setmaxplayers: CommandInfo = {
  command: "setmaxplayers",
  documentation: "Sets the maximum number of players for this game session.",
  overloads: [
    {
      params: [
        {
          value: "int",
          signatureValue: "<maxPlayers>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default setmaxplayers;
