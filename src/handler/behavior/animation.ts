import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { animationStore } from "../../store/behavior/animation";
import { entityStore } from "../../store/behavior/entity";

export const animationHandler = new JsonHandler(pattern.animation, [
  {
    path: ["animations/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(
        entityStore.get("animation_identifier").filter((v) => v.value.startsWith("animation.")),
        animationStore.get("identifier"),
      ),
    provideDefinition: () => entityStore.get("animation_identifier"),
    provideRename: () => animationStore.get("identifier").concat(entityStore.get("animation_identifier")),
  },
]);
