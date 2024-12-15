import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { attachableStore } from "../../store/resource/attachable";
import { clientEntityStore } from "../../store/resource/client_entity";
import { soundStore } from "../../store/resource/sound";
import { soundDefinitionStore } from "../../store/resource/sound_definition";

export const soundDefinitionHandler = new JsonHandler(pattern.soundDefinition, [
  {
    path: ["sound_definitions/*"],
    matchType: "key",
    provideCompletion: () =>
      Store.difference(
        attachableStore.get("sound_definition_identifier").concat(clientEntityStore.get("sound_definition_identifier")),
        soundDefinitionStore.get("identifier"),
      ),
    provideDefinition: () =>
      attachableStore.get("sound_definition_identifier").concat(clientEntityStore.get("sound_definition_identifier")),
    provideRename: () =>
      soundDefinitionStore
        .get("identifier")
        .concat(
          attachableStore.get("sound_definition_identifier"),
          clientEntityStore.get("sound_definition_identifier"),
        ),
  },
  {
    path: ["sound_definitions/*/sounds/*/name"],
    matchType: "value",
    provideCompletion: () => soundStore.get("path"),
    provideDefinition: () => soundStore.get("path"),
  },
]);
