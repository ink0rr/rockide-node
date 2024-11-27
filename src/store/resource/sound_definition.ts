import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const soundDefinitionStore = new JsonStore(pattern.soundDefinition, [
  {
    id: "identifier",
    path: ["sound_definitions"],
  },
]);
