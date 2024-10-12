import { CommandInfo, ParamType } from "../types";

const recipe: CommandInfo = {
  command: "recipe",
  documentation: "Unlocks recipe in the recipe book for a player.",
  overloads: [
    {
      params: [
        {
          value: ["give"],
          signatureValue: "<give>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          value: ["unlockablerecipevalues", "minecraft:bundle", "*", "todo:recip"],
          signatureValue: "<recipe>",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["take"],
          signatureValue: "<take>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          value: ["unlockablerecipevalues", "minecraft:bundle", "*", "todo:recip"],
          signatureValue: "<recipe>",
          type: ParamType.enum,
        },
      ],
    },
  ],
};
export default recipe;
