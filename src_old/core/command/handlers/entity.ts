import * as JSONC from "jsonc-parser";
import { bpGlob } from "../../../constants";
import { commandCompletion } from "../completion";
import { commandDefinitions } from "../definition";
import { commandSignature } from "../signature";
import { JsonCommandHandler } from "./_types";

function isQueueCommand(node: JSONC.Node) {
  const path = JSONC.getNodePath(node);
  return (
    (path.at(-2) === "command" && path.at(-3) === "queue_command") ||
    (!!node.type.match(/(string|null)/) && path.at(-1) === "command" && path.at(-2) === "queue_command")
  );
}

export const entityHandler: JsonCommandHandler = {
  pattern: `**/${bpGlob}/entities/**/*.json`,
  index: true,
  semanticNode(node) {
    return isQueueCommand(node);
  },
  process(jsonContext, commandContext, rockide) {
    if (!(jsonContext.matchProperty("queue_command", "command") || jsonContext.matchArray("command"))) {
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
