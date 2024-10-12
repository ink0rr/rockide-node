import { CommandInfo, ParamType } from "../types";

const spawnpoint: CommandInfo = {
  command: "spawnpoint",
  documentation: "Sets the spawn point for a player.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "[player]",
          type: ParamType.playerSelector,
        },
        {
          value: "position",
          signatureValue: "[spawnPos]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default spawnpoint;
