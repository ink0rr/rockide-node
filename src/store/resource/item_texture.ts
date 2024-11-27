import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const itemTextureStore = new JsonStore(pattern.itemTexture, [
  {
    id: "identifier",
    path: ["texture_data"],
  },
]);
