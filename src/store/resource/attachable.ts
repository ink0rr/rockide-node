import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const attachableStore = new JsonStore(pattern.attachable, [
  {
    id: "identifier",
    path: ["minecraft:attachable/description/identifier"],
  },
  {
    id: "animation",
    path: ["minecraft:attachable/description/animations"],
  },
  {
    id: "animation_identifier",
    path: ["minecraft:attachable/description/animations/*"],
  },
  {
    id: "animate",
    path: ["minecraft:attachable/description/scripts/animate"],
  },
  {
    id: "material",
    path: ["minecraft:attachable/description/materials"],
  },
  {
    id: "material_identifier",
    path: ["minecraft:attachable/description/materials/*"],
  },
  {
    id: "texture",
    path: ["minecraft:attachable/description/textures"],
  },
  {
    id: "texture_path",
    path: ["minecraft:attachable/description/textures/*"],
  },
  {
    id: "geometry",
    path: ["minecraft:attachable/description/geometry"],
  },
  {
    id: "geometry_identifier",
    path: ["minecraft:attachable/description/geometry/*"],
  },
  {
    id: "render_controller_identifier",
    path: ["minecraft:attachable/description/render_controllers"],
  },
  {
    id: "particle",
    path: [
      "minecraft:attachable/description/particle_effects",
      "minecraft:attachable/description/particle_emitters",
    ],
  },
  {
    id: "particle_identifier",
    path: [
      "minecraft:attachable/description/particle_effects/*",
      "minecraft:attachable/description/particle_emitters/*",
    ],
  },
  {
    id: "sound_definition",
    path: ["minecraft:attachable/description/sound_effects"],
  },
  {
    id: "sound_definition_identifier",
    path: ["minecraft:attachable/description/sound_effects/*"],
  },
]);
