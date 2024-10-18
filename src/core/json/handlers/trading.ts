import { bpGlob } from "../../../constants";
import { JsonHandler } from "./_type";

export const tradingHandler: JsonHandler = {
  pattern: `**/${bpGlob}/trading/**/*.json`,
  index: "path",
};
