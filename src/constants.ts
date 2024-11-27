import * as JSONC from "jsonc-parser";
import * as vscode from "vscode";

export const baseGlob = "**/!(build|dist|tmp)";

export const bpGlob = "{behavior_pack,*BP,BP_*,*bp,bp_*}";

export const rpGlob = "{resource_pack,*RP,RP_*,*rp,rp_*}";

export const projectGlob = "{behavior_pack,*BP,BP_*,*bp,bp_*,resource_pack,*RP,RP_*,*rp,rp_*}";

export const pattern = {
  // BP
  animationController: `**/${bpGlob}/animation_controllers/**/*.json`,
  animation: `**/${bpGlob}/animations/**/*.json`,
  block: `**/${bpGlob}/blocks/**/*.json`,
  entity: `**/${bpGlob}/entities/**/*.json`,
  function: `**/${bpGlob}/functions/**/*.mcfunction`,
  item: `**/${bpGlob}/items/**/*.json`,
  lootTable: `**/${bpGlob}/loot_tables/**/*.json`,
  recipe: `**/${bpGlob}/recipes/**/*.json`,
  spawnRule: `**/${bpGlob}/spawn_rules/**/*.json`,
  structure: `**/${bpGlob}/structures/**/*.mcstructure`,
  tradeTable: `**/${bpGlob}/trading/**/*.json`,
  // RP
  clientAnimationControllers: `**/${rpGlob}/animation_controllers/**/*.json`,
  clientAnimations: `**/${rpGlob}/animations/**/*.json`,
  attachable: `**/${rpGlob}/attachables/**/*.json`,
  clientEntity: `**/${rpGlob}/entity/**/*.json`,
  geometry: `**/${rpGlob}/models/**/*.json`,
  itemTexture: `**/${rpGlob}/textures/item_texture.json`,
  soundDefinition: `**/${rpGlob}/sounds/sound_definitions.json`,
  sound: `**/${rpGlob}/sounds/**/*.{fsb,ogg,wav}`,
  texture: `**/${rpGlob}/textures/**/*.{png,tga,fsb}`,
};

export const jsonSelector: vscode.DocumentSelector = [
  { scheme: "file", language: "json" },
  { scheme: "file", language: "jsonc" },
];

export const NullNode: JSONC.Node = {
  type: "null",
  length: 4,
  offset: 0,
};

export const propertyDomain = ["bool_property", "enum_property", "float_property", "int_property"];
