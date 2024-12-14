import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { clientEntityStore } from "../../store/resource/client_entity";
import { renderControllerStore } from "../../store/resource/render_controller";

export const renderControllerHandler = new JsonHandler(pattern.renderController, [
  {
    path: ["render_controllers/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(clientEntityStore.get("render_controller_identifier"), renderControllerStore.get("identifier")),
    provideDefinition: () => clientEntityStore.get("render_controller_identifier"),
    provideRename: () =>
      renderControllerStore.get("identifier").concat(clientEntityStore.get("render_controller_identifier")),
  },
]);
