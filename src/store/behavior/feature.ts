import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const featureStore = new JsonStore(pattern.feature, [
  {
    id: "identifier",
    path: ["*/description/identifier"],
  },
  {
    id: "block_identifier",
    path: [
      "minecraft:single_block_feature/may_attach_to/top/*",
      "minecraft:single_block_feature/may_attach_to/bottom/*",
      "minecraft:single_block_feature/may_attach_to/north/*",
      "minecraft:single_block_feature/may_attach_to/east/*",
      "minecraft:single_block_feature/may_attach_to/south/*",
      "minecraft:single_block_feature/may_attach_to/west/*",
      "minecraft:single_block_feature/may_attach_to/all/*",
      "minecraft:single_block_feature/may_attach_to/sides/*",
      "minecraft:single_block_feature/places_block",
      "minecraft:single_block_feature/may_replace/*",
      "minecraft:ore_feature/places_block",
      "minecraft:ore_feature/may_replace/*",
      "minecraft:structure_template_feature/constraints/block_intersection/block_allowlist/*",
      "minecraft:tree_feature/base_cluster/may_replace/*",
      "minecraft:tree_feature/may_grow_on/*",
      "minecraft:tree_feature/may_grow_through/*",
      "minecraft:tree_feature/may_replace/*",
      "minecraft:tree_feature/acacia_trunk/trunk_block",
      "minecraft:tree_feature/acacia_trunk/trunk_decoration/block_reference",
      "minecraft:tree_feature/fallen_trunk/trunk_block",
      "minecraft:tree_feature/fallen_trunk/trunk_decoration/block_reference",
      "minecraft:tree_feature/fancy_trunk/trunk_block",
      "minecraft:tree_feature/mega_trunk/trunk_block",
      "minecraft:tree_feature/mega_trunk/trunk_decoration/block_reference",
      "minecraft:tree_feature/trunk/base_block",
      "minecraft:tree_feature/trunk/trunk_block",
      "minecraft:tree_feature/trunk/trunk_decoration/block_reference",
    ],
  },
]);
