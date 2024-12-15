import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { itemStore } from "../../store/behavior/item";
import { attachableStore } from "../../store/resource/attachable";
import { clientEntityStore } from "../../store/resource/client_entity";
import { itemTextureStore } from "../../store/resource/item_texture";

export const itemHandler = new JsonHandler(pattern.item, [
  {
    path: ["minecraft:item/description/identifier"],
    provideCompletion: () => Store.difference(attachableStore.get("identifier"), itemStore.get("identifier")),
    provideDefinition: () => attachableStore.get("identifier"),
    provideRename: () => itemStore.get("identifier").concat(attachableStore.get("identifier")),
  },
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
