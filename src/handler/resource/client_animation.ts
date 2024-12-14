import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { clientAnimationStore } from "../../store/resource/client_animation";
import { clientEntityStore } from "../../store/resource/client_entity";

export const clientAnimationHandler = new JsonHandler(pattern.clientAnimations, [
  {
    path: ["animations/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(
        clientEntityStore.get("animation_identifier").filter((v) => v.value.startsWith("animation.")),
        clientAnimationStore.get("identifier"),
      ),
    provideDefinition: () => clientEntityStore.get("animation_identifier"),
    provideRename: () => clientAnimationStore.get("identifier").concat(clientEntityStore.get("animation_identifier")),
  },
]);
