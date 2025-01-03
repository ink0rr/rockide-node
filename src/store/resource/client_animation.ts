import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const clientAnimationStore = new JsonStore(pattern.clientAnimation, [
  {
    id: "identifier",
    path: ["animations"],
  },
]);
