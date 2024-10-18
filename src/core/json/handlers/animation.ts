import { bpGlob } from "../../../constants";
import { JsonHandler } from "./_type";

export const animationHandler: JsonHandler = {
  pattern: `**/${bpGlob}/animations/**/*.json`,
  index: "parse",
};
