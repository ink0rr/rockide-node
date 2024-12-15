import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const particleStore = new JsonStore(pattern.particle, [
  {
    id: "identifier",
    path: ["particle_effect/description/identifier"],
  },
  {
    id: "identifier_refs",
    path: ["particle_effect/events/**/particle_effect/effect"],
  },
  {
    id: "texture_path",
    path: ["particle_effect/description/basic_render_parameters/texture"],
  },
  {
    id: "event",
    path: ["particle_effect/events"],
  },
  {
    id: "event_refs",
    path: [
      "particle_effect/components/minecraft:emitter_lifetime_events/creation_event",
      "particle_effect/components/minecraft:emitter_lifetime_events/expiration_event",
      "particle_effect/components/minecraft:emitter_lifetime_events/looping_travel_distance_events",
      "particle_effect/components/minecraft:emitter_lifetime_events/timeline/*/*",
      "particle_effect/components/minecraft:emitter_lifetime_events/travel_distance_events/*/*",
      "particle_effect/components/minecraft:particle_lifetime_events/creation_event",
      "particle_effect/components/minecraft:particle_lifetime_events/expiration_event",
      "particle_effect/components/minecraft:particle_lifetime_events/timeline/*/*",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/creation_event",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/expiration_event",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/looping_travel_distance_events",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/timeline/*/*",
      "particle_effect/events/**/components/minecraft:emitter_lifetime_events/travel_distance_events/*/*",
      "particle_effect/events/**/components/minecraft:particle_lifetime_events/creation_event",
      "particle_effect/events/**/components/minecraft:particle_lifetime_events/expiration_event",
      "particle_effect/events/**/components/minecraft:particle_lifetime_events/timeline/*/*",
    ],
  },
]);
