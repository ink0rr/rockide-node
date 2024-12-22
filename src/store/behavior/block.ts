import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const blockStore = new JsonStore(pattern.block, [
  {
    id: "identifier",
    path: ["minecraft:block/description/identifier"],
  },
  {
    id: "tag",
    path: ["minecraft:block/components", "minecraft:block/permutations/*/components"],
    transform: (node) => {
      if (typeof node.value !== "string" || !node.value.startsWith("tag:")) {
        return null;
      }
      return node.value.replace("tag:", "");
    },
  },
]);
