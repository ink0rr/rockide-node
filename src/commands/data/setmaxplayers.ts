import { CommandInfo, ParamType } from "../types";

const setmaxplayers: CommandInfo = {
  command: "setmaxplayers",
  documentation: "Sets the maximum number of players for this game session.",
  overloads: [
    {
      params: [
        {
          value: Array.from({ length: 10 }).map(String),
          signatureValue: "<maxPlayers>",
          type: ParamType.number,
        },
      ],
    },
  ],
};
export default setmaxplayers;
