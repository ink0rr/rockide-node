import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { clientAnimationControllerStore } from "../../store/resource/client_animation_controller";
import { clientEntityStore } from "../../store/resource/client_entity";

export const clientAnimationControllerHandler = new JsonHandler(pattern.clientAnimationControllers, [
  {
    path: ["animation_controllers/*"],
    matchType: "key",
    provideCompletion: () => {
      const declarations = clientAnimationControllerStore.get("identifier").map(({ value }) => value);
      return clientEntityStore
        .get("animation_identifier")
        .filter(({ value }) => value.startsWith("controller.") && !declarations.includes(value));
    },
    provideDefinition: () => clientEntityStore.get("animation_identifier"),
    provideRename: () =>
      clientAnimationControllerStore.get("identifier").concat(clientEntityStore.get("animation_identifier")),
  },
]);
