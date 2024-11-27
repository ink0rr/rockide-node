import { CommandInfo, ParamType } from "../types";

const ride: CommandInfo = {
  command: "ride",
  documentation:
    "Makes entities ride other entities, stops entities from riding, makes rides evict their riders, or summons rides or riders.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<riders>",
          type: ParamType.entitySelector,
        },
        {
          value: ["start_riding"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<ride>",
          type: ParamType.entitySelector,
        },
        {
          value: ["teleport_rider", "teleport_ride"],
          signatureValue: "[teleportRules]",
          type: ParamType.enum,
        },
        {
          value: ["until_full", "if_group_fits"],
          signatureValue: "[howToFill]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<riders>",
          type: ParamType.entitySelector,
        },
        {
          value: ["stop_riding"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<rides>",
          type: ParamType.entitySelector,
        },
        {
          value: ["evict_riders"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<rides>",
          type: ParamType.entitySelector,
        },
        {
          value: ["summon_rider"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["todo", "entity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[spawnEvent]",
          type: ParamType.string,
        },
        {
          value: "todo",
          signatureValue: "[nameTag]",
          type: ParamType.string,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<riders>",
          type: ParamType.entitySelector,
        },
        {
          value: ["summon_ride"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["todo", "entity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.keyword,
        },
        {
          value: ["no_ride_change", "reassign_rides", "skip_riders"],
          signatureValue: "[rideRules]",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[spawnEvent]",
          type: ParamType.string,
        },
        {
          value: "todo",
          signatureValue: "[nameTag]",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default ride;
