import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const geometryStore = new JsonStore(pattern.geometry, [
  {
    id: "identifier",
    path: ["minecraft:geometry/*/description/identifier"],
  },
]);
