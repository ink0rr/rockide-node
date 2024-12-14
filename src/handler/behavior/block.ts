import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { blockStore } from "../../store/behavior/block";
import { clientBlockStore } from "../../store/resource/client_block";

export const blockHandler = new JsonHandler(pattern.block, [
  {
    path: ["minecraft:block/description/identifier"],
    matchType: "value",
    provideCompletion: () => Store.difference(clientBlockStore.get("identifier"), blockStore.get("identifier")),
    provideDefinition: () => clientBlockStore.get("identifier"),
    provideRename: () => clientBlockStore.get("identifier").concat(blockStore.get("identifier")),
  },
]);
