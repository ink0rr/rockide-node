import { bpGlob, rpGlob } from "../../constants";
import { JsonHandler } from "./_type";

export const animationHandler: JsonHandler = {
  pattern: [`**/${bpGlob}/animations/**/*.json`, `**/${rpGlob}/animations/**/*.json`],
  index: "parse",
};
