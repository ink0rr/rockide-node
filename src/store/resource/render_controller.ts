import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const renderControllerStore = new JsonStore(pattern.renderController, [
  {
    id: "identifier",
    path: ["render_controllers"],
  },
]);
