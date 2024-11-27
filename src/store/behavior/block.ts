import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const blockStore = new JsonStore(pattern.block, [
  {
    id: "identifier",
    path: ["minecraft:block/description/identifier"],
  },
]);
