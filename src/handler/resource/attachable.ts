import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { itemStore } from "../../store/behavior/item";
import { attachableStore } from "../../store/resource/attachable";
import { clientAnimationStore } from "../../store/resource/client_animation";
import { clientAnimationControllerStore } from "../../store/resource/client_animation_controller";
import { clientEntityStore } from "../../store/resource/client_entity";
import { geometryStore } from "../../store/resource/geometry";
import { particleStore } from "../../store/resource/particle";
import { renderControllerStore } from "../../store/resource/render_controller";
import { soundDefinitionStore } from "../../store/resource/sound_definition";
import { textureStore } from "../../store/resource/texture";

export const attachableHandler = new JsonHandler(pattern.attachable, [
  {
    path: ["minecraft:attachable/description/identifier"],
    provideCompletion: () => Store.difference(itemStore.get("identifier"), attachableStore.get("identifier")),
    provideDefinition: () => itemStore.get("identifier"),
    provideRename: () => attachableStore.get("identifier").concat(itemStore.get("identifier")),
  },
  {
    path: ["minecraft:attachable/description/animations/*"],
    provideCompletion: (context) => {
      if (context.location.isAtPropertyKey) {
        return Store.difference(
          attachableStore.getFrom(context.uri, "animate"),
          attachableStore.getFrom(context.uri, "animation"),
        );
      }
      return clientAnimationControllerStore.get("identifier").concat(clientAnimationStore.get("identifier"));
    },
    provideDefinition: (context) => {
      if (context.location.isAtPropertyKey) {
        return attachableStore.getFrom(context.uri, "animate");
      }
      return clientAnimationControllerStore.get("identifier").concat(clientAnimationStore.get("identifier"));
    },
    provideRename: () =>
      attachableStore
        .get("animation_identifier")
        .concat(
          clientEntityStore.get("animation_identifier"),
          clientAnimationControllerStore.get("identifier"),
          clientAnimationStore.get("identifier"),
        ),
  },
  {
    path: ["minecraft:attachable/description/scripts/animate/*"],
    provideCompletion: (context) => attachableStore.getFrom(context.uri, "animation"),
    provideDefinition: (context) => attachableStore.getFrom(context.uri, "animation"),
    provideRename: (context) =>
      attachableStore.getFrom(context.uri, "animation").concat(attachableStore.getFrom(context.uri, "animate")),
  },
  {
    path: ["minecraft:attachable/description/scripts/animate/*/*"],
    matchType: "key",
    provideCompletion: (context) => attachableStore.getFrom(context.uri, "animation"),
    provideDefinition: (context) => attachableStore.getFrom(context.uri, "animation"),
    provideRename: (context) =>
      attachableStore.getFrom(context.uri, "animation").concat(attachableStore.getFrom(context.uri, "animate")),
  },
  {
    path: ["minecraft:attachable/description/textures/*"],
    matchType: "value",
    provideCompletion: () => textureStore.get("path"),
    provideDefinition: () => textureStore.get("path"),
  },
  {
    path: ["minecraft:attachable/description/geometry/*"],
    matchType: "value",
    provideCompletion: () => geometryStore.get("identifier"),
    provideDefinition: () => geometryStore.get("identifier"),
    provideRename: () =>
      geometryStore
        .get("identifier")
        .concat(attachableStore.get("geometry_identifier"), clientEntityStore.get("geometry_identifier")),
  },
  {
    path: ["minecraft:attachable/description/render_controllers/**"],
    provideCompletion: (context) => {
      if (context.isAtPropertyKeyOrArray()) {
        return renderControllerStore.get("identifier");
      }
    },
    provideDefinition: (context) => {
      if (context.isAtPropertyKeyOrArray()) {
        return renderControllerStore.get("identifier");
      }
    },
    provideRename: (context) => {
      if (context.isAtPropertyKeyOrArray()) {
        return renderControllerStore
          .get("identifier")
          .concat(
            attachableStore.get("render_controller_identifier"),
            clientEntityStore.get("render_controller_identifier"),
          );
      }
    },
  },
  {
    path: [
      "minecraft:attachable/description/particle_effects/*",
      "minecraft:attachable/description/particle_emitters/*",
    ],
    matchType: "value",
    provideCompletion: () => particleStore.get("identifier"),
    provideDefinition: () => particleStore.get("identifier"),
    provideRename: () =>
      particleStore
        .get("identifier")
        .concat(
          particleStore.get("identifier_refs"),
          attachableStore.get("particle_identifier"),
          clientEntityStore.get("particle_identifier"),
        ),
  },
  {
    path: ["minecraft:attachable/description/sound_effects/*"],
    matchType: "value",
    provideCompletion: () => soundDefinitionStore.get("identifier"),
    provideDefinition: () => soundDefinitionStore.get("identifier"),
    provideRename: () =>
      soundDefinitionStore
        .get("identifier")
        .concat(
          attachableStore.get("sound_definition_identifier"),
          clientEntityStore.get("sound_definition_identifier"),
        ),
  },
]);
