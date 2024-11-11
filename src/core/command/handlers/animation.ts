import { bpGlob } from "../../../constants";
import { commandCompletion } from "../completion";
import { commandDefinitions } from "../definition";
import { commandSignature } from "../signature";
import { JsonCommandHandler } from "./_types";

export const animationHandler: JsonCommandHandler = {
  pattern: `**/${bpGlob}/animations/**/*.json`,
  index: true,
  semanticNode(path) {
    const timelineKey = path.at(-2);
    if (path.at(-3) !== "timeline" || !timelineKey || isNaN(parseFloat(timelineKey.toString()))) {
      return false;
    }
    return true;
  },
  process(jsonContext, commandContext, rockide) {
    const timelineKey = jsonContext.path.at(-2);
    if (jsonContext.path.at(-3) !== "timeline" || !timelineKey || isNaN(parseFloat(timelineKey.toString()))) {
      return;
    }
    return {
      completions() {
        return commandCompletion(commandContext, rockide, { slash: true }).map((c) => {
          if (jsonContext.node.type === "null") {
            c.insertText = `"${c.label}"`;
            c.command = {
              title: "Move cursor",
              command: "cursorLeft",
            };
          }
          return c;
        });
      },
      signature() {
        return commandSignature(commandContext);
      },
      definitions() {
        return commandDefinitions(commandContext, rockide);
      },
    };
  },
};
