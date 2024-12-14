import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { entityStore } from "../../store/behavior/entity";
import { itemStore } from "../../store/behavior/item";
import { clientAnimationStore } from "../../store/resource/client_animation";
import { clientAnimationControllerStore } from "../../store/resource/client_animation_controller";
import { clientEntityStore } from "../../store/resource/client_entity";
import { geometryStore } from "../../store/resource/geometry";
import { itemTextureStore } from "../../store/resource/item_texture";
import { textureStore } from "../../store/resource/texture";

export const clientEntityHandler = new JsonHandler(pattern.clientEntity, [
  {
    path: ["minecraft:client_entity/description/identifier"],
    provideCompletion: () => Store.difference(entityStore.get("identifier"), clientEntityStore.get("identifier")),
    provideDefinition: () => entityStore.get("identifier"),
    provideRename: () => entityStore.get("identifier").concat(clientEntityStore.get("identifier")),
  },
  {
    path: ["minecraft:client_entity/description/animations/*"],
    provideCompletion: (context) => {
      if (context.location.isAtPropertyKey) {
        return Store.difference(
          clientEntityStore.getFrom(context.uri, "animate"),
          clientEntityStore.getFrom(context.uri, "animation"),
        );
      }
      return clientAnimationControllerStore.get("identifier").concat(clientAnimationStore.get("identifier"));
    },
    provideDefinition: (context) => {
      if (context.location.isAtPropertyKey) {
        return clientEntityStore.getFrom(context.uri, "animate");
      }
      return clientAnimationControllerStore.get("identifier").concat(clientAnimationStore.get("identifier"));
    },
    provideRename: () =>
      clientAnimationControllerStore.get("identifier").concat(clientEntityStore.get("animation_identifier")),
  },
  {
    path: ["minecraft:client_entity/description/scripts/animate/*"],
    provideCompletion: (context) => clientEntityStore.getFrom(context.uri, "animation"),
    provideDefinition: (context) => clientEntityStore.getFrom(context.uri, "animation"),
    provideRename: (context) =>
      clientEntityStore.getFrom(context.uri, "animation").concat(clientEntityStore.getFrom(context.uri, "animate")),
  },
  {
    path: ["minecraft:client_entity/description/scripts/animate/*/*"],
    matchType: "key",
    provideCompletion: (context) => clientEntityStore.getFrom(context.uri, "animation"),
    provideDefinition: (context) => clientEntityStore.getFrom(context.uri, "animation"),
    provideRename: (context) =>
      clientEntityStore.getFrom(context.uri, "animation").concat(clientEntityStore.getFrom(context.uri, "animate")),
  },
  {
    path: ["minecraft:client_entity/description/textures/*"],
    matchType: "value",
    provideCompletion: () => textureStore.get("path"),
    provideDefinition: () => textureStore.get("path"),
  },
  {
    path: ["minecraft:client_entity/description/geometry/*"],
    matchType: "value",
    provideCompletion: () => geometryStore.get("identifier"),
    provideDefinition: () => geometryStore.get("identifier"),
    provideRename: () => geometryStore.get("identifier").concat(clientEntityStore.get("geometry_identifier")),
  },
  {
    path: ["minecraft:client_entity/description/spawn_egg/texture"],
    matchType: "value",
    provideCompletion: () => itemTextureStore.get("identifier"),
    provideDefinition: () => itemTextureStore.get("identifier"),
    provideRename: () =>
      itemTextureStore.get("identifier").concat(clientEntityStore.get("spawn_egg"), itemStore.get("icon")),
  },
]);
