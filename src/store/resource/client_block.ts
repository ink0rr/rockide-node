import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";
import { skipKey } from "../../utils/transform";

export const clientBlockStore = new JsonStore(pattern.clientBlock, [
  {
    id: "identifier",
    path: ["*"],
    transform: (node) => {
      const parent = node.parent;
      const key = parent?.children?.[0];
      if (parent?.type === "property" && key && key.value !== "format_version") {
        return key;
      }
      return null;
    },
  },
  {
    id: "texture",
    path: ["*/textures", "*/textures/*"],
    transform: skipKey,
  },
]);
