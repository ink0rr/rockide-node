import { rpGlob } from "../../../constants";
import { JsonHandler } from "./_type";

export const renderControllerHandler: JsonHandler = {
  pattern: `**/${rpGlob}/render_controllers/**/*.json`,
  index: "parse",
};
