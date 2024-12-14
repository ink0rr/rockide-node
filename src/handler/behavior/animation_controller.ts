import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { animationControllerStore } from "../../store/behavior/animation_controller";
import { entityStore } from "../../store/behavior/entity";

export const animationControllerHandler = new JsonHandler(pattern.animationController, [
  {
    path: ["animation_controllers/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(
        entityStore.get("animation_identifier").filter((v) => v.value.startsWith("controller.")),
        animationControllerStore.get("identifier"),
      ),
    provideDefinition: () => entityStore.get("animation_identifier"),
    provideRename: () => animationControllerStore.get("identifier").concat(entityStore.get("animation_identifier")),
  },
]);
