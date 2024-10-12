import { CommandInfo, ParamType } from "../types";

const replaceitem: CommandInfo = {
  command: "replaceitem",
  documentation: "Replaces items in inventories.",
  overloads: [
    {
      params: [
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "<itemName>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.keyword,
        },
        {
          value: ["unknown_JSON_OBJECT"],
          signatureValue: "[components]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["entity"],
          signatureValue: "<entity>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<target>",
          type: ParamType.selector,
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
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "<itemName>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.keyword,
        },
        {
          value: ["unknown_JSON_OBJECT"],
          signatureValue: "[components]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
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
          value: ["destroy", "keep"],
          signatureValue: "<oldItemHandling>",
          type: ParamType.keyword,
        },
        {
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "<itemName>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.keyword,
        },
        {
          value: ["unknown_JSON_OBJECT"],
          signatureValue: "[components]",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: ["entity"],
          signatureValue: "<entity>",
          type: ParamType.keyword,
        },
        {
          value: "selector",
          signatureValue: "<target>",
          type: ParamType.selector,
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
          value: ["destroy", "keep"],
          signatureValue: "<oldItemHandling>",
          type: ParamType.keyword,
        },
        {
          value: ["minecraft:dirt", "dirt", "todo"],
          signatureValue: "<itemName>",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.keyword,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.keyword,
        },
        {
          value: ["unknown_JSON_OBJECT"],
          signatureValue: "[components]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default replaceitem;
