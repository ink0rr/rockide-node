import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { blockStore } from "../../store/behavior/block";
import { clientBlockStore } from "../../store/resource/client_block";

export const clientBlockHandler = new JsonHandler(pattern.clientBlock, [
  {
    path: ["*"],
    matchType: "key",
    provideCompletion: () => Store.difference(blockStore.get("identifier"), clientBlockStore.get("identifier")),
    provideDefinition: () => blockStore.get("identifier"),
    provideRename: () => blockStore.get("identifier").concat(clientBlockStore.get("identifier")),
  },
]);
