import { itemIdentifier } from "../../../literals/item_identifier";
import { CommandInfo, ParamType } from "../types";

const give: CommandInfo = {
  command: "give",
  documentation: "Gives an item to a player.",
  overloads: [
    {
      params: [
        {
          value: "selector",
          signatureValue: "<player>",
          type: ParamType.playerSelector,
        },
        {
          // todo: dynamic item
          value: itemIdentifier,
          signatureValue: "<itemName>",
          type: ParamType.keyword,
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
export default give;
