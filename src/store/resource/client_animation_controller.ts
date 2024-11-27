import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const clientAnimationControllerStore = new JsonStore(pattern.clientAnimationControllers, [
  {
    id: "identifier",
    path: ["animation_controllers"],
  },
]);
