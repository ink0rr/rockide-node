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
          type: ParamType.selector,
        },
        {
          value: ["start_riding"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<ride>",
          type: ParamType.selector,
        },
        {
          value: ["teleport_rider", "teleport_ride"],
          signatureValue: "[teleportRules]",
          type: ParamType.keyword,
        },
        {
          value: ["until_full", "if_group_fits"],
          signatureValue: "[howToFill]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<riders>",
          type: ParamType.selector,
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
          type: ParamType.selector,
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
          type: ParamType.selector,
        },
        {
          value: ["summon_rider"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["entity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[spawnEvent]",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[nameTag]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: "selector",
          signatureValue: "<riders>",
          type: ParamType.selector,
        },
        {
          value: ["summon_ride"],
          signatureValue: "<mode>",
          type: ParamType.keyword,
        },
        {
          value: ["entity_type", "minecraft:slime"],
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
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "[nameTag]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default ride;
