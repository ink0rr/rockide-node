import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { attachableStore } from "../../store/resource/attachable";
import { clientEntityStore } from "../../store/resource/client_entity";
import { geometryStore } from "../../store/resource/geometry";

export const geometryHandler = new JsonHandler(pattern.geometry, [
  {
    path: ["minecraft:geometry/*/description/identifier"],
    matchType: "value",
    provideCompletion: () =>
      Store.difference(
        attachableStore.get("geometry_identifier").concat(clientEntityStore.get("geometry_identifier")),
        geometryStore.get("identifier"),
      ),
    provideDefinition: () =>
      attachableStore.get("geometry_identifier").concat(clientEntityStore.get("geometry_identifier")),
    provideRename: () =>
      geometryStore
        .get("identifier")
        .concat(attachableStore.get("geometry_identifier"), clientEntityStore.get("geometry_identifier")),
  },
]);
