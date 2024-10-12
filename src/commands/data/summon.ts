import { CommandInfo, ParamType } from "../types";

const summon: CommandInfo = {
  command: "summon",
  documentation: "Summons an entity.",
  overloads: [
    {
      params: [
        {
          value: ["entity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "[spawnPos]",
          type: ParamType.keyword,
        },
        {
          value: "rot",
          signatureValue: "[yRot]",
          type: ParamType.keyword,
        },
        {
          value: "rot",
          signatureValue: "[xRot]",
          type: ParamType.keyword,
        },
        {
          value: ["entity_events", "minecraft:on_spawned"],
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
          value: ["entity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<nameTag>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "[spawnPos]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["entity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "[spawnPos]",
          type: ParamType.keyword,
        },
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "<lookAtPosition>",
          type: ParamType.keyword,
        },
        {
          value: ["entity_events", "minecraft:on_spawned"],
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
          value: ["entity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.keyword,
        },
        {
          value: "position",
          signatureValue: "[spawnPos]",
          type: ParamType.keyword,
        },
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<lookAtEntity>",
          type: ParamType.selector,
        },
        {
          value: ["entity_events", "minecraft:on_spawned"],
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
export default summon;
