import { rpGlob } from "../../../constants";
import { JsonHandler } from "./_type";

export const geometryHandler: JsonHandler = {
  pattern: `**/${rpGlob}/models/**/*.json`,
  index: "parse",
};
