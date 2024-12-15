import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { clientBlockStore } from "../../store/resource/client_block";
import { terrainTextureStore } from "../../store/resource/terrain_texture";
import { textureStore } from "../../store/resource/texture";

export const terrainTextureHandler = new JsonHandler(pattern.terrainTexture, [
  {
    path: ["texture_data/*"],
    matchType: "key",
    provideCompletion: () => Store.difference(clientBlockStore.get("texture"), terrainTextureStore.get("identifier")),
    provideDefinition: () => clientBlockStore.get("texture"),
    provideRename: () => terrainTextureStore.get("identifier").concat(clientBlockStore.get("texture")),
  },
  {
    path: ["texture_data/*/textures", "texture_data/*/textures/path"],
    matchType: "value",
    provideCompletion: () => textureStore.get("path"),
    provideDefinition: () => textureStore.get("path"),
  },
]);
