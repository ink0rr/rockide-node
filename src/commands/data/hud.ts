import { CommandInfo, ParamType } from "../types";

const hud: CommandInfo = {
  command: "hud",
  documentation: "Changes the visibility of hud elements.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<target>",
          type: ParamType.playerSelector,
        },
        {
          value: ["hide", "reset"],
          signatureValue: "<visible>",
          type: ParamType.keyword,
        },
        {
          value: [
            "hunger",
            "all",
            "paperdoll",
            "armor",
            "tooltips",
            "touch_controls",
            "crosshair",
            "hotbar",
            "health",
            "progress_bar",
            "air_bubbles",
            "horse_health",
            "status_effects",
            "item_text",
          ],
          signatureValue: "[hud_element]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default hud;
