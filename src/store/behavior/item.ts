import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";
import { skipKey } from "../../utils/transform";

export const itemStore = new JsonStore(pattern.item, [
  {
    id: "identifier",
    path: ["minecraft:item/description/identifier"],
  },
  {
    id: "icon",
    path: [
      "minecraft:item/components/minecraft:icon",
      "minecraft:item/components/minecraft:icon/texture",
      "minecraft:item/components/minecraft:icon/textures/*",
    ],
    transform: skipKey,
  },
  {
    id: "tag",
    path: ["minecraft:item/components/minecraft:tags/tags"],
  },
]);
