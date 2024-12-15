import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { Store } from "../../core/store";
import { attachableStore } from "../../store/resource/attachable";
import { clientEntityStore } from "../../store/resource/client_entity";
import { particleStore } from "../../store/resource/particle";
import { textureStore } from "../../store/resource/texture";

export const particleHandler = new JsonHandler(pattern.particle, [
  {
    path: ["particle_effect/description/identifier"],
    matchType: "value",
    provideCompletion: () =>
      Store.difference(
        particleStore
          .get("identifier_refs")
          .concat(attachableStore.get("particle_identifier"), clientEntityStore.get("particle_identifier")),
        particleStore.get("identifier"),
      ),
    provideDefinition: () =>
      particleStore
        .get("identifier_refs")
        .concat(attachableStore.get("particle_identifier"), clientEntityStore.get("particle_identifier")),
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
    path: ["particle_effect/events/**/particle_effect/effect"],
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
    path: ["particle_effect/description/basic_render_parameters/texture"],
    matchType: "value",
    provideCompletion: () => textureStore.get("path"),
    provideDefinition: () => textureStore.get("path"),
  },
  {
    path: ["particle_effect/events/*"],
    matchType: "key",
    provideCompletion: (context) =>
      Store.difference(particleStore.getFrom(context.uri, "event_refs"), particleStore.getFrom(context.uri, "event")),
    provideDefinition: (context) => particleStore.getFrom(context.uri, "event_refs"),
    provideRename: (context) =>
      particleStore.getFrom(context.uri, "event").concat(particleStore.getFrom(context.uri, "event_refs")),
  },
  {
    path: [
      "particle_effect/components/minecraft:emitter_lifetime_events/creation_event/*",
      "particle_effect/components/minecraft:emitter_lifetime_events/expiration_event/*",
      "particle_effect/components/minecraft:emitter_lifetime_events/looping_travel_distance_events/*",
      "particle_effect/components/minecraft:emitter_lifetime_events/timeline/*/*",
      "particle_effect/components/minecraft:emitter_lifetime_events/travel_distance_events/*/*",
      "particle_effect/components/minecraft:particle_lifetime_events/creation_event/*",
      "particle_effect/components/minecraft:particle_lifetime_events/expiration_event/*",
      "particle_effect/components/minecraft:particle_lifetime_events/timeline/*/*",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/creation_event/*",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/expiration_event/*",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/looping_travel_distance_events/*",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/timeline/*/*",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/travel_distance_events/*/*",
      "particle_effect/events/**/components/minecraft:particle_lifetime_events/creation_event/*",
      "particle_effect/events/**/components/minecraft:particle_lifetime_events/expiration_event/*",
      "particle_effect/events/**/components/minecraft:particle_lifetime_events/timeline/*/*",
    ],
    matchType: "value",
    provideCompletion: (context) => particleStore.getFrom(context.uri, "event"),
    provideDefinition: (context) => particleStore.getFrom(context.uri, "event"),
    provideRename: (context) =>
      particleStore.getFrom(context.uri, "event").concat(particleStore.getFrom(context.uri, "event_refs")),
  },
]);
