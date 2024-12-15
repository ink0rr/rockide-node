import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const terrainTextureStore = new JsonStore(pattern.terrainTexture, [
  {
    id: "identifier",
    path: ["texture_data"],
  },
]);
