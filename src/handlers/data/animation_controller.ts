import { bpGlob, rpGlob } from "../../constants";
import { molangCompletions } from "../shared";
import { RockideHandler } from "../types";

export const animationControllerHandler: RockideHandler = {
  pattern: [`**/${bpGlob}/animation_controllers/**/*.json`, `**/${rpGlob}/animation_controllers/**/*.json`],
  index: "parse",
  process(ctx) {
    const id = ctx.path[1];
    if (ctx.matchConditionalArray("transitions")) {
      return ctx.localRef(["animation_controllers", id, "states"]);
    }
    if (
      ctx.matchArray("on_entry") ||
      ctx.matchArray("on_exit") ||
      ctx.matchArrayObject("animations") ||
      ctx.matchArrayObject("transitions")
    ) {
      return {
        completions: () => molangCompletions(ctx),
      };
    }
  },
};
