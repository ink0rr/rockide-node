import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { blockStore } from "../../store/behavior/block";
import { clientBlockStore } from "../../store/resource/client_block";
import { terrainTextureStore } from "../../store/resource/terrain_texture";

export const clientBlockHandler = new JsonHandler(pattern.clientBlock, [
  {
    path: ["*"],
    matchType: "key",
    provideCompletion: () => Store.difference(blockStore.get("identifier"), clientBlockStore.get("identifier")),
    provideDefinition: () => blockStore.get("identifier"),
    provideRename: () => blockStore.get("identifier").concat(clientBlockStore.get("identifier")),
  },
  {
    path: ["*/textures", "*/textures/*"],
    matchType: "value",
    provideCompletion: () => terrainTextureStore.get("identifier"),
    provideDefinition: () => terrainTextureStore.get("identifier"),
    provideRename: () => terrainTextureStore.get("identifier").concat(clientBlockStore.get("texture")),
  },
]);
