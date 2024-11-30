import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { itemStore } from "../../store/behavior/item";
import { clientEntityStore } from "../../store/resource/client_entity";
import { itemTextureStore } from "../../store/resource/item_texture";

export const itemHandler = new JsonHandler(pattern.item, [
  {
    path: [
      "minecraft:item/components/minecraft:icon",
      "minecraft:item/components/minecraft:icon/texture",
      "minecraft:item/components/minecraft:icon/textures/*",
    ],
    matchType: "value",
    provideCompletion: () => itemTextureStore.get("identifier"),
    provideDefinition: () => itemTextureStore.get("identifier"),
    provideRename: () =>
      itemTextureStore.get("identifier").concat(itemStore.get("icon"), clientEntityStore.get("spawn_egg")),
  },
]);
