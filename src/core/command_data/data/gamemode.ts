import { CommandInfo, ParamType } from "../types";

const gamemode: CommandInfo = {
  command: "gamemode",
  documentation: "Sets a player's game mode.",
  overloads: [
    {
      params: [
        {
          value: ["default", "creative", "spectator", "survival", "adventure", "d", "c", "s", "a"],
          signatureValue: "<gameMode>",
          type: ParamType.enum,
        },
        {
          value: "<player>",
          type: ParamType.playerSelector,
        },
      ],
    },
    {
      params: [
        {
          value: ["0", "1", "2", "5"],
          documentation: ["survival", "creative", "adventure", "default"],
          type: ParamType.enum,
        },
        {
          value: "<player>",
          type: ParamType.playerSelector,
        },
      ],
    },
  ],
};
export default gamemode;
