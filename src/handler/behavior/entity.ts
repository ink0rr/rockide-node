import * as JSONC from "jsonc-parser";
import { pattern, propertyDomain } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { animationStore } from "../../store/behavior/animation";
import { animationControllerStore } from "../../store/behavior/animation_controller";
import { entityStore } from "../../store/behavior/entity";
import { lootTableStore } from "../../store/behavior/loot_table";
import { tradeTableStore } from "../../store/behavior/trade_table";
import { clientEntityStore } from "../../store/resource/client_entity";

export const entityHandler = new JsonHandler(pattern.entity, [
  {
    path: ["minecraft:entity/description/identifier"],
    provideCompletion() {
      const declarations = entityStore.get("identifier").map(({ value }) => value);
      return clientEntityStore.get("identifier").filter(({ value }) => !declarations.includes(value));
    },
    provideDefinition: () => clientEntityStore.get("identifier"),
    provideRename: () => clientEntityStore.get("identifier").concat(entityStore.get("identifier")),
  },
  {
    path: ["minecraft:entity/description/animations/*"],
    provideCompletion: (context) => {
      if (context.location.isAtPropertyKey) {
        const declarations = entityStore.getFrom(context.uri, "animate").map(({ value }) => value);
        return entityStore.getFrom(context.uri, "animate_refs").filter(({ value }) => !declarations.includes(value));
      }
      return animationControllerStore.get("identifier").concat(animationStore.get("identifier"));
    },
    provideDefinition: (context) => {
      if (context.location.isAtPropertyKey) {
        return entityStore.getFrom(context.uri, "animate_refs");
      }
      return animationControllerStore.get("identifier").concat(animationStore.get("identifier"));
    },
    provideRename: () => animationControllerStore.get("identifier").concat(entityStore.get("animation_identifier")),
  },
  {
    path: ["minecraft:entity/description/scripts/animate/*"],
    provideCompletion: (context) => entityStore.getFrom(context.uri, "animate"),
    provideDefinition: (context) => entityStore.getFrom(context.uri, "animate"),
    provideRename: (context) =>
      entityStore.getFrom(context.uri, "animate").concat(entityStore.getFrom(context.uri, "animate_refs")),
  },
  {
    path: ["minecraft:entity/description/scripts/animate/*/*"],
    matchType: "key",
    provideCompletion: (context) => entityStore.getFrom(context.uri, "animate"),
    provideDefinition: (context) => entityStore.getFrom(context.uri, "animate"),
    provideRename: (context) =>
      entityStore.getFrom(context.uri, "animate").concat(entityStore.getFrom(context.uri, "animate_refs")),
  },
  {
    path: ["minecraft:entity/description/properties/*"],
    matchType: "key",
    provideCompletion: (context) => {
      const declarations = entityStore.get("property").map(({ value }) => value);
      return entityStore.getFrom(context.uri, "property_refs").filter(({ value }) => !declarations.includes(value));
    },
    provideDefinition: (context) => entityStore.getFrom(context.uri, "property_refs"),
    provideRename: (context) =>
      entityStore.getFrom(context.uri, "property_refs").concat(entityStore.getFrom(context.uri, "property")),
  },
  {
    path: ["minecraft:entity/events/**/set_property/*"],
    matchType: "key",
    provideCompletion: (context) => entityStore.getFrom(context.uri, "property"),
    provideDefinition: (context) => entityStore.getFrom(context.uri, "property"),
    provideRename: (context) =>
      entityStore.getFrom(context.uri, "property").concat(entityStore.getFrom(context.uri, "property_refs")),
  },
  {
    path: [
      "minecraft:entity/components/**/filters/**/domain",
      "minecraft:entity/component_groups/**/filters/**/domain",
    ],
    provideCompletion: (context) => {
      const parent = context.getParentNode();
      const test = JSONC.findNodeAtLocation(parent!, ["test"]);
      if (!test || !propertyDomain.includes(test.value)) {
        return [];
      }
      const subject = JSONC.findNodeAtLocation(parent!, ["subject"]);
      if (subject && subject.value !== "self") {
        return [];
      }
      return entityStore.get("property");
    },
    provideDefinition: (context) => {
      const parent = context.getParentNode();
      const test = JSONC.findNodeAtLocation(parent!, ["test"]);
      if (!test || !propertyDomain.includes(test.value)) {
        return [];
      }
      const subject = JSONC.findNodeAtLocation(parent!, ["subject"]);
      if (subject && subject.value !== "self") {
        return [];
      }
      return entityStore.get("property");
    },
  },
  {
    path: ["minecraft:entity/component_groups/*"],
    matchType: "key",
    provideCompletion: (context) => entityStore.getFrom(context.uri, "component_group_refs"),
    provideDefinition: (context) => entityStore.getFrom(context.uri, "component_group_refs"),
    provideRename: (context) => entityStore.getFrom(context.uri, "component_group"),
  },
  {
    path: ["minecraft:entity/events/*"],
    matchType: "key",
    provideCompletion: (context) => entityStore.getFrom(context.uri, "event_refs"),
    provideDefinition: (context) => entityStore.getFrom(context.uri, "event_refs"),
    provideRename: (context) => entityStore.getFrom(context.uri, "event"),
  },
  {
    path: ["minecraft:entity/events/**/component_groups/*"],
    provideCompletion: (context) => entityStore.getFrom(context.uri, "component_group"),
    provideDefinition: (context) => entityStore.getFrom(context.uri, "component_group"),
    provideRename: (context) => entityStore.getFrom(context.uri, "component_group_refs"),
  },
  {
    path: ["minecraft:entity/components/**/event", "minecraft:entity/component_groups/**/event"],
    provideCompletion: (context) => entityStore.getFrom(context.uri, "event"),
    provideDefinition: (context) => entityStore.getFrom(context.uri, "event"),
    provideRename: (context) => entityStore.getFrom(context.uri, "event_refs"),
  },
  {
    path: [
      "minecraft:entity/components/minecraft:type_family/family/*",
      "minecraft:entity/component_groups/*/minecraft:type_family/family/*",
    ],
    provideCompletion: () => entityStore.get("family"),
    provideDefinition: () => entityStore.get("family"),
    provideRename: () => entityStore.get("family"),
  },
  {
    path: ["minecraft:entity/components/minecraft:loot/table"],
    provideCompletion: () => lootTableStore.get("path"),
    provideDefinition: () => lootTableStore.get("path"),
  },
  {
    path: [
      "minecraft:entity/components/minecraft:trade_table/table",
      "minecraft:entity/components/minecraft:economy_trade_table/table",
      "minecraft:entity/component_groups/*/minecraft:trade_table/table",
      "minecraft:entity/component_groups/*/minecraft:economy_trade_table/table",
    ],
    provideCompletion: () => tradeTableStore.get("path"),
    provideDefinition: () => tradeTableStore.get("path"),
  },
]);
