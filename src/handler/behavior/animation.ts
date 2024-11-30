import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { animationStore } from "../../store/behavior/animation";
import { entityStore } from "../../store/behavior/entity";

export const animationHandler = new JsonHandler(pattern.animation, [
  {
    path: ["animations/*"],
    matchType: "key",
    provideCompletion: () => {
      const declarations = animationStore.get("identifier").map(({ value }) => value);
      return entityStore
        .get("animation_identifier")
        .filter(({ value }) => value.startsWith("animation.") && !declarations.includes(value));
    },
    provideDefinition: () => entityStore.get("animation_identifier"),
    provideRename: () => animationStore.get("identifier").concat(entityStore.get("animation_identifier")),
  },
]);
