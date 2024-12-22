import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { attachableStore } from "../../store/resource/attachable";
import { clientAnimationStore } from "../../store/resource/client_animation";
import { clientEntityStore } from "../../store/resource/client_entity";

export const clientAnimationHandler = new JsonHandler(pattern.clientAnimations, [
  {
    path: ["animations/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(
        attachableStore
          .get("animation_identifier")
          .concat(clientEntityStore.get("animation_identifier"))
          .filter((v) => v.value.startsWith("animation.")),
        clientAnimationStore.get("identifier"),
      ),
    provideDefinition: () =>
      attachableStore.get("animation_identifier").concat(clientEntityStore.get("animation_identifier")),
    provideRename: () =>
      clientAnimationStore
        .get("identifier")
        .concat(attachableStore.get("animation_identifier"), clientEntityStore.get("animation_identifier")),
  },
]);
