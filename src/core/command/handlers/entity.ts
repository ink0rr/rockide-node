import * as JSONC from "jsonc-parser";
import { bpGlob } from "../../../constants";
import { commandCompletion } from "../completion";
import { commandDefinitions } from "../definition";
import { commandSignature } from "../signature";
import { JsonCommandHandler } from "./_types";

function isQueueCommand(path: JSONC.JSONPath) {
  return path.at(-2) === "command" && path.at(-3) === "queue_command";
}

export const entityHandler: JsonCommandHandler = {
  pattern: `**/${bpGlob}/entities/**/*.json`,
  index: true,
  semanticNode(path) {
    return isQueueCommand(path);
  },
  process(jsonContext, commandContext, rockide) {
    if (!isQueueCommand(jsonContext.path)) {
      return;
    }
    return {
      completions() {
        return commandCompletion(commandContext, rockide).map((c) => {
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
