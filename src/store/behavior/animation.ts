import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const animationStore = new JsonStore(pattern.animation, [
  {
    id: "identifier",
    path: ["animations"],
  },
]);
