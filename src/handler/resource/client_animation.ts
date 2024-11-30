import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { clientAnimationStore } from "../../store/resource/client_animation";
import { clientEntityStore } from "../../store/resource/client_entity";

export const clientAnimationHandler = new JsonHandler(pattern.clientAnimations, [
  {
    path: ["animations/*"],
    matchType: "key",
    provideCompletion: () => {
      const declarations = clientAnimationStore.get("identifier").map(({ value }) => value);
      return clientEntityStore
        .get("animation_identifier")
        .filter(({ value }) => value.startsWith("animation.") && !declarations.includes(value));
    },
    provideDefinition: () => clientEntityStore.get("animation_identifier"),
    provideRename: () => clientAnimationStore.get("identifier").concat(clientEntityStore.get("animation_identifier")),
  },
]);
