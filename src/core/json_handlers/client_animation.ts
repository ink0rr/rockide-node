import { rpGlob } from "../../constants";
import { JsonHandler } from "./_type";

export const clientAnimationHandler: JsonHandler = {
  pattern: `**/${rpGlob}/animations/**/*.json`,
  index: "parse",
};
