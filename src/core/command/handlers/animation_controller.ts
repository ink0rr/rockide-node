import { bpGlob } from "../../../constants";
import { commandCompletion } from "../completion";
import { commandDefinitions } from "../definition";
import { commandSignature } from "../signature";
import { JsonCommandHandler } from "./_types";

const keys = ["on_entry", "on_exit"] as const;

export const animationControllerHandler: JsonCommandHandler = {
  pattern: `**/${bpGlob}/animation_controllers/**/*.json`,
  index: true,
  semanticNode(path) {
    return keys.some((k) => path.at(-2)?.toString() === k);
  },
  process(jsonContext, commandContext, rockide) {
    for (const k of keys) {
      if (!jsonContext.matchArray(k)) {
        continue;
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
    }
  },
};
