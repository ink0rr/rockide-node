import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const animationControllerStore = new JsonStore(pattern.animationController, [
  {
    id: "identifier",
    path: ["animation_controllers"],
  },
]);
