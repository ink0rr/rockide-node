import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const summon: CommandInfo = {
  command: "summon",
  documentation: "Summons an entity.",
  overloads: [
    {
      params: [
        {
          value: ["todoentity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.enum,
        },
        ...Parameter.createPosition("spawnPos"),
        ...Parameter.rotYX,
        {
          value: ["todoentity_events", "minecraft:on_spawned"],
          signatureValue: "[spawnEvent]",
          type: ParamType.keyword,
        },
        {
          value: "nameTag",
          signatureValue: "[nameTag]",
          type: ParamType.string,
        },
      ],
    },
    {
      params: [
        {
          value: ["todoentity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.enum,
        },
        {
          value: "nameTag",
          signatureValue: "<nameTag>",
          type: ParamType.string,
        },
        ...Parameter.createPosition("spawnPos"),
      ],
    },
    {
      params: [
        {
          value: ["todoentity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.enum,
        },
        ...Parameter.createPosition("spawnPos"),
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
          value: ["todoentity_events", "minecraft:on_spawned"],
          signatureValue: "[spawnEvent]",
          type: ParamType.keyword,
        },
        {
          value: "nameTag",
          signatureValue: "[nameTag]",
          type: ParamType.string,
        },
      ],
    },
    {
      params: [
        {
          value: ["todoentity_type", "minecraft:slime"],
          signatureValue: "<entityType>",
          type: ParamType.enum,
        },
        ...Parameter.createPosition("spawnPos"),
        {
          value: ["facing"],
          signatureValue: "<facing>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<lookAtEntity>",
          type: ParamType.entitySelector,
        },
        {
          value: ["todoentity_events", "minecraft:on_spawned"],
          signatureValue: "[spawnEvent]",
          type: ParamType.keyword,
        },
        {
          value: "nameTag",
          signatureValue: "[nameTag]",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default summon;
