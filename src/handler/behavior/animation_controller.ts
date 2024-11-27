import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { animationControllerStore } from "../../store/behavior/animation_controller";
import { entityStore } from "../../store/behavior/entity";

export const animationControllerHandler = new JsonHandler(pattern.animationController, [
  {
    path: ["animation_controllers/*"],
    matchType: "key",
    provideCompletion: () => {
      const declarations = animationControllerStore.get("identifier").map(({ value }) => value);
      return entityStore
        .get("animation_identifier")
        .filter(({ value }) => value.startsWith("controller.") && !declarations.includes(value));
    },
    provideDefinition: () => entityStore.get("animation_identifier"),
    provideRename: () => animationControllerStore.get("identifier").concat(entityStore.get("animation_identifier")),
  },
]);
