import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { attachableStore } from "../../store/resource/attachable";
import { clientAnimationControllerStore } from "../../store/resource/client_animation_controller";
import { clientEntityStore } from "../../store/resource/client_entity";

export const clientAnimationControllerHandler = new JsonHandler(pattern.clientAnimationController, [
  {
    path: ["animation_controllers/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(
        attachableStore
          .get("animation_identifier")
          .concat(clientEntityStore.get("animation_identifier"))
          .filter((v) => v.value.startsWith("controller.")),
        clientAnimationControllerStore.get("identifier"),
      ),
    provideDefinition: () =>
      attachableStore.get("animation_identifier").concat(clientEntityStore.get("animation_identifier")),
    provideRename: () =>
      clientAnimationControllerStore
        .get("identifier")
        .concat(attachableStore.get("animation_identifier"), clientEntityStore.get("animation_identifier")),
  },
]);
