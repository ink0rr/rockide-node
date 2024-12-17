import { animationStore } from "./behavior/animation";
import { animationControllerStore } from "./behavior/animation_controller";
import { blockStore } from "./behavior/block";
import { entityStore } from "./behavior/entity";
import { featureStore } from "./behavior/feature";
import { featureRuleStore } from "./behavior/feature_rule";
import { itemStore } from "./behavior/item";
import { lootTableStore } from "./behavior/loot_table";
import { recipeStore } from "./behavior/recipe";
import { tradeTableStore } from "./behavior/trade_table";
import { attachableStore } from "./resource/attachable";
import { clientAnimationStore } from "./resource/client_animation";
import { clientAnimationControllerStore } from "./resource/client_animation_controller";
import { clientBlockStore } from "./resource/client_block";
import { clientEntityStore } from "./resource/client_entity";
import { geometryStore } from "./resource/geometry";
import { itemTextureStore } from "./resource/item_texture";
import { particleStore } from "./resource/particle";
import { renderControllerStore } from "./resource/render_controller";
import { soundStore } from "./resource/sound";
import { soundDefinitionStore } from "./resource/sound_definition";
import { terrainTextureStore } from "./resource/terrain_texture";
import { textureStore } from "./resource/texture";

export const storeList = [
  // BP
  animationControllerStore,
  animationStore,
  blockStore,
  entityStore,
  featureRuleStore,
  featureStore,
  itemStore,
  lootTableStore,
  recipeStore,
  tradeTableStore,
  // RP
  attachableStore,
  clientAnimationControllerStore,
  clientAnimationStore,
  clientBlockStore,
  clientEntityStore,
  geometryStore,
  itemTextureStore,
  particleStore,
  renderControllerStore,
  soundDefinitionStore,
  soundStore,
  terrainTextureStore,
  textureStore,
];
