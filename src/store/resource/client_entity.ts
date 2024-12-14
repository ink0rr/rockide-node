import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const clientEntityStore = new JsonStore(pattern.clientEntity, [
  {
    id: "identifier",
    path: ["minecraft:client_entity/description/identifier"],
  },
  {
    id: "animation",
    path: ["minecraft:client_entity/description/animations"],
  },
  {
    id: "animation_identifier",
    path: ["minecraft:client_entity/description/animations/*"],
  },
  {
    id: "animate",
    path: ["minecraft:client_entity/description/scripts/animate"],
  },
  {
    id: "material",
    path: ["minecraft:client_entity/description/materials"],
  },
  {
    id: "material_identifier",
    path: ["minecraft:client_entity/description/materials/*"],
  },
  {
    id: "texture",
    path: ["minecraft:client_entity/description/textures"],
  },
  {
    id: "texture_path",
    path: ["minecraft:client_entity/description/textures/*"],
  },
  {
    id: "geometry",
    path: ["minecraft:client_entity/description/geometry"],
  },
  {
    id: "geometry_identifier",
    path: ["minecraft:client_entity/description/geometry/*"],
  },
  {
    id: "render_controller_identifier",
    path: ["minecraft:client_entity/description/render_controllers"],
  },
  {
    id: "spawn_egg",
    path: ["minecraft:client_entity/description/spawn_egg/texture"],
  },
  {
    id: "particle",
    path: [
      "minecraft:client_entity/description/particle_effects",
      "minecraft:client_entity/description/particle_emitters",
    ],
  },
  {
    id: "particle_identifier",
    path: [
      "minecraft:client_entity/description/particle_effects/*",
      "minecraft:client_entity/description/particle_emitters/*",
    ],
  },
  {
    id: "sound_definition",
    path: ["minecraft:client_entity/description/sound_effects"],
  },
  {
    id: "sound_definition_identifier",
    path: ["minecraft:client_entity/description/sound_effects/*"],
  },
]);
