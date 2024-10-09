import { bpGlob } from "../../constants";
import { JsonHandler } from "./_type";

export const lootTableHandler: JsonHandler = {
  pattern: `**/${bpGlob}/loot_tables/**/*.json`,
  index: "path",
};
