import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { itemStore } from "../../store/behavior/item";
import { clientEntityStore } from "../../store/resource/client_entity";
import { itemTextureStore } from "../../store/resource/item_texture";

export const itemTextureHandler = new JsonHandler(pattern.itemTexture, [
  {
    path: ["texture_data/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(
        clientEntityStore.get("spawn_egg").concat(itemStore.get("icon")),
        itemTextureStore.get("identifier"),
      ),
    provideDefinition: () => clientEntityStore.get("spawn_egg").concat(itemStore.get("icon")),
    provideRename: () =>
      clientEntityStore.get("spawn_egg").concat(itemStore.get("icon"), itemTextureStore.get("identifier")),
  },
]);
