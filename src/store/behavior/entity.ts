import * as JSONC from "jsonc-parser";
import { pattern, propertyDomain } from "../../constants";
import { JsonStore } from "../../core/json_store";
import { skipKey } from "../../utils/transform";

export const entityStore = new JsonStore(pattern.entity, [
  {
    id: "identifier",
    path: ["minecraft:entity/description/identifier"],
  },
  {
    id: "animation",
    path: ["minecraft:entity/description/animations"],
  },
  {
    id: "animation_identifier",
    path: ["minecraft:entity/description/animations/*"],
  },
  {
    id: "animate",
    path: ["minecraft:entity/description/scripts/animate"],
  },
  {
    id: "property",
    path: ["minecraft:entity/description/properties"],
  },
  {
    id: "property_refs",
    path: ["minecraft:entity/events/**/set_property"],
  },
  {
    id: "property_refs",
    path: [
      "minecraft:entity/components/**/filters/**/domain",
      "minecraft:entity/component_groups/**/filters/**/domain",
    ],
    transform: (node) => {
      const parent = node.parent?.parent;
      const test = JSONC.findNodeAtLocation(parent!, ["test"]);
      if (!test || !propertyDomain.includes(test.value)) {
        return null;
      }
      return node.value;
    },
  },
  {
    id: "component_group",
    path: ["minecraft:entity/component_groups"],
  },
  {
    id: "component_group_refs",
    path: ["minecraft:entity/events/**/component_groups"],
  },
  {
    id: "event",
    path: ["minecraft:entity/events"],
  },
  {
    id: "event_refs",
    path: ["minecraft:entity/events/**/trigger", "minecraft:entity/events/**/trigger/event"],
    transform: skipKey,
  },
  {
    id: "event_refs",
    path: [
      "minecraft:behavior.admire_item",
      "minecraft:behavior.avoid_block",
      "minecraft:behavior.avoid_mob_type",
      "minecraft:behavior.celebrate_survive",
      "minecraft:behavior.celebrate",
      "minecraft:behavior.defend_trusted_target",
      "minecraft:behavior.delayed_attack",
      "minecraft:behavior.dig",
      "minecraft:behavior.drop_item_for",
      "minecraft:behavior.eat_block",
      "minecraft:behavior.emerge",
      "minecraft:behavior.go_and_give_items_to_noteblock",
      "minecraft:behavior.go_and_give_items_to_owner",
      "minecraft:behavior.go_home",
      "minecraft:behavior.hold_ground",
      "minecraft:behavior.knockback_roar",
      "minecraft:behavior.lay_egg",
      "minecraft:behavior.melee_attack",
      "minecraft:behavior.stomp_attack",
      "minecraft:behavior.move_to_block",
      "minecraft:behavior.ram_attack",
      "minecraft:behavior.work",
      "minecraft:behavior.work_composter",
      "minecraft:ageable",
      "minecraft:angry",
      "minecraft:attack_cooldown",
      "minecraft:block_sensor",
      "minecraft:breedable",
      "minecraft:damage_sensor",
      "minecraft:environment_sensor",
      "minecraft:drying_out_timer",
      "minecraft:equippable",
      "minecraft:genetics",
      "minecraft:giveable",
      "minecraft:inside_block_notifier",
      "minecraft:interact",
      "minecraft:leashable",
      "minecraft:lookat",
      "minecraft:nameable",
      "minecraft:on_death",
      "minecraft:on_friendly_anger",
      "minecraft:on_hurt",
      "minecraft:on_hurt_by_player",
      "minecraft:on_ignite",
      "minecraft:on_start_landing",
      "minecraft:on_start_takeoff",
      "minecraft:on_target_acquired",
      "minecraft:on_target_escape",
      "minecraft:on_wake_with_owner",
      "minecraft:peek",
      "minecraft:projectile",
      "minecraft:raid_trigger",
      "minecraft:rail_sensor",
      "minecraft:ravager_blocked",
      "minecraft:scheduler",
      "minecraft:sittable",
      "minecraft:tameable",
      "minecraft:tamemount",
      "minecraft:target_nearby_sensor",
      "minecraft:timer",
      "minecraft:trusting",
    ].flatMap((path) => [
      `minecraft:entity/components/${path}/**/event`,
      `minecraft:entity/component_groups/*/${path}/**/event`,
    ]),
  },
  {
    id: "family",
    path: [
      "minecraft:entity/components/minecraft:type_family/family",
      "minecraft:entity/component_groups/*/minecraft:type_family/family",
    ],
  },
  {
    id: "loot_table_path",
    path: [
      "minecraft:loot/table",
      "minecraft:behavior.sneeze/loot_table",
      "minecraft:barter/barter_table",
      "minecraft:interact/interactions/add_items/table",
      "minecraft:interact/interactions/*/add_items/table",
      "minecraft:interact/interactions/spawn_items/table",
      "minecraft:interact/interactions/*/spawn_items/table",
    ].flatMap((path) => [
      `minecraft:entity/components/${path}/**/event`,
      `minecraft:entity/component_groups/*/${path}/**/event`,
    ]),
  },
  {
    id: "trade_table_path",
    path: ["minecraft:trade_table/table", "minecraft:economy_trade_table/table"].flatMap((path) => [
      `minecraft:entity/components/${path}/**/event`,
      `minecraft:entity/component_groups/*/${path}/**/event`,
    ]),
  },
]);
