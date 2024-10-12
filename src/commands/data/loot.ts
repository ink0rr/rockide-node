import { blockIdentifier } from "../../literals/block_identifier";
import { slot } from "../../literals/slot";
import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const loot: CommandInfo = {
  command: "loot",
  documentation: "Drops the given loot table into the specified inventory or into the world.",
  overloads: [
    {
      params: [
        {
          value: ["spawn"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("location"),
        {
          value: ["loot"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<loot_table>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["spawn"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("location"),
        {
          value: ["kill"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["give"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<players>",
          type: ParamType.playerSelector,
        },
        {
          value: ["loot"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<loot_table>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["give"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<players>",
          type: ParamType.playerSelector,
        },
        {
          value: ["kill"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["insert"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("location"),
        {
          value: ["loot"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<loot_table>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["insert"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("location"),
        {
          value: ["kill"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["replace"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: ["entity"],
          signatureValue: "<entity>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: slot,
          signatureValue: "<slotType>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "<count>",
          type: ParamType.keyword,
        },
        {
          value: ["loot"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<loot_table>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["replace"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: ["entity"],
          signatureValue: "<entity>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: slot,
          signatureValue: "<slotType>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: ["loot"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<loot_table>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["replace"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: ["entity"],
          signatureValue: "<entity>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: slot,
          signatureValue: "<slotType>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "<count>",
          type: ParamType.keyword,
        },
        {
          value: ["kill"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["replace"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: ["entity"],
          signatureValue: "<entity>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: slot,
          signatureValue: "<slotType>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: ["kill"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["replace"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: ["block"],
          signatureValue: "<block>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("location"),
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "<count>",
          type: ParamType.number,
        },
        {
          value: ["loot"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "todo",
          signatureValue: "<loot_table>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["replace"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: ["block"],
          signatureValue: "<block>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("location"),
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: ["loot"],
          signatureValue: "<source>",
          type: ParamType.number,
        },
        {
          value: "todo",
          signatureValue: "<loot_table>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["replace"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: ["block"],
          signatureValue: "<block>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("location"),
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "<count>",
          type: ParamType.number,
        },
        {
          value: ["kill"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
    {
      params: [
        {
          value: ["replace"],
          signatureValue: "<target>",
          type: ParamType.keyword,
        },
        {
          value: ["block"],
          signatureValue: "<block>",
          type: ParamType.keyword,
        },
        ...Parameter.createPosition("location"),
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: ["kill"],
          signatureValue: "<source>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<entity>",
          type: ParamType.playerSelector,
        },
        {
          value: blockIdentifier.concat("mainhand", "offhand"),
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.enum,
        },
      ],
    },
  ],
};
export default loot;
