import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";
import { skipKey } from "../../utils/transform";

export const clientBlockStore = new JsonStore(pattern.clientBlock, [
  {
    id: "identifier",
    path: ["*"],
    transform: (node) => {
      if (node.value === "format_version") {
        return null;
      }
      return node.value;
    },
  },
  {
    id: "texture",
    path: ["*/textures", "*/textures/*"],
    transform: skipKey,
  },
]);
