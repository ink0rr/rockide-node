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
        {
          value: "position",
          signatureValue: "<position>",
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
        {
          value: "position",
          signatureValue: "<position>",
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
        {
          value: "position",
          signatureValue: "<position>",
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
        {
          value: "position",
          signatureValue: "<position>",
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
          value: [
            "slot.weapon.mainhand",
            "slot.weapon.offhand",
            "slot.armor.head",
            "slot.armor.chest",
            "slot.armor.legs",
            "slot.armor.feet",
            "slot.armor.body",
            "slot.hotbar",
            "slot.inventory",
            "slot.enderchest",
            "slot.saddle",
            "slot.armor",
            "slot.chest",
            "slot.equippable",
          ],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.keyword,
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
          value: [
            "slot.weapon.mainhand",
            "slot.weapon.offhand",
            "slot.armor.head",
            "slot.armor.chest",
            "slot.armor.legs",
            "slot.armor.feet",
            "slot.armor.body",
            "slot.hotbar",
            "slot.inventory",
            "slot.enderchest",
            "slot.saddle",
            "slot.armor",
            "slot.chest",
            "slot.equippable",
          ],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
          value: [
            "slot.weapon.mainhand",
            "slot.weapon.offhand",
            "slot.armor.head",
            "slot.armor.chest",
            "slot.armor.legs",
            "slot.armor.feet",
            "slot.armor.body",
            "slot.hotbar",
            "slot.inventory",
            "slot.enderchest",
            "slot.saddle",
            "slot.armor",
            "slot.chest",
            "slot.equippable",
          ],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.keyword,
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
          value: [
            "slot.weapon.mainhand",
            "slot.weapon.offhand",
            "slot.armor.head",
            "slot.armor.chest",
            "slot.armor.legs",
            "slot.armor.feet",
            "slot.armor.body",
            "slot.hotbar",
            "slot.inventory",
            "slot.enderchest",
            "slot.saddle",
            "slot.armor",
            "slot.chest",
            "slot.equippable",
          ],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
        {
          value: "position",
          signatureValue: "<position>",
          type: ParamType.keyword,
        },
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.keyword,
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
        {
          value: "position",
          signatureValue: "<position>",
          type: ParamType.keyword,
        },
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
        {
          value: "position",
          signatureValue: "<position>",
          type: ParamType.keyword,
        },
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.keyword,
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
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
        {
          value: "position",
          signatureValue: "<position>",
          type: ParamType.keyword,
        },
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "[<tool>|mainhand|offhand]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default loot;
