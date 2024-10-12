import { blockIdentifier } from "../../literals/block_identifier";
import { slot } from "../../literals/slot";
import { Parameter } from "../parameter";
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
        ...Parameter.createPosition("position"),
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: blockIdentifier,
          signatureValue: "<itemName>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.number,
        },
        {
          value: [
            '{"item_lock": {"mode": "lock_in_slot"}}',
            '{"item_lock": {"mode": "lock_in_inventory"}}',
            '{"keep_on_death": {}}',
          ],
          signatureValue: "[components]",
          type: ParamType.itemNBT,
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
          type: ParamType.entitySelector,
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
          value: blockIdentifier,
          signatureValue: "<itemName>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.number,
        },
        {
          value: [
            '{"item_lock": {"mode": "lock_in_slot"}}',
            '{"item_lock": {"mode": "lock_in_inventory"}}',
            '{"keep_on_death": {}}',
          ],
          signatureValue: "[components]",
          type: ParamType.itemNBT,
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
        ...Parameter.createPosition("position"),
        {
          value: ["slot.container"],
          signatureValue: "<slotType>",
          type: ParamType.keyword,
        },
        {
          value: Array.from({ length: 28 }, (_, i) => i).map(String),
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: ["destroy", "keep"],
          signatureValue: "<oldItemHandling>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier,
          signatureValue: "<itemName>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.number,
        },
        {
          value: [
            '{"item_lock": {"mode": "lock_in_slot"}}',
            '{"item_lock": {"mode": "lock_in_inventory"}}',
            '{"keep_on_death": {}}',
          ],
          signatureValue: "[components]",
          type: ParamType.itemNBT,
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
          type: ParamType.entitySelector,
        },
        {
          value: slot,
          signatureValue: "<slotType>",
          type: ParamType.enum,
        },
        {
          value: Array.from({ length: 28 }, (_, i) => i).map(String),
          signatureValue: "<slotId>",
          type: ParamType.number,
        },
        {
          value: ["destroy", "keep"],
          signatureValue: "<oldItemHandling>",
          type: ParamType.keyword,
        },
        {
          value: blockIdentifier,
          signatureValue: "<itemName>",
          type: ParamType.enum,
        },
        {
          value: "int",
          signatureValue: "[amount]",
          type: ParamType.number,
        },
        {
          value: "int",
          signatureValue: "[data]",
          type: ParamType.number,
        },
        {
          value: [
            '{"item_lock": {"mode": "lock_in_slot"}}',
            '{"item_lock": {"mode": "lock_in_inventory"}}',
            '{"keep_on_death": {}}',
          ],
          signatureValue: "[components]",
          type: ParamType.itemNBT,
        },
      ],
    },
  ],
};
export default replaceitem;
