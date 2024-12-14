import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { clientAnimationControllerStore } from "../../store/resource/client_animation_controller";
import { clientEntityStore } from "../../store/resource/client_entity";

export const clientAnimationControllerHandler = new JsonHandler(pattern.clientAnimationControllers, [
  {
    path: ["animation_controllers/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(
        clientEntityStore.get("animation_identifier").filter((v) => v.value.startsWith("controller.")),
        clientAnimationControllerStore.get("identifier"),
      ),
    provideDefinition: () => clientEntityStore.get("animation_identifier"),
    provideRename: () =>
      clientAnimationControllerStore.get("identifier").concat(clientEntityStore.get("animation_identifier")),
  },
]);
