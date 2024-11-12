import * as JSONC from "jsonc-parser";
import { bpGlob } from "../../../constants";
import { commandCompletion } from "../completion";
import { commandDefinitions } from "../definition";
import { commandSignature } from "../signature";
import { JsonCommandHandler } from "./_types";

const keys = ["on_close_commands", "on_open_commands", "commands"] as const;

export const dialogueHandler: JsonCommandHandler = {
  pattern: `**/${bpGlob}/dialogue/**/*.json`,
  index: true,
  semanticNode(node) {
    const path = JSONC.getNodePath(node);
    return (
      !!node.type.match(/(string|null)/) && typeof path.at(-1) === "number" && keys.some((key) => path.at(-2) === key)
    );
  },
  process(jsonContext, commandContext, rockide) {
    for (const property of keys) {
      if (!jsonContext.matchArray(property)) {
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
