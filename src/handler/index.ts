import { animationHandler } from "./behavior/animation";
import { animationControllerHandler } from "./behavior/animation_controller";
import { blockHandler } from "./behavior/block";
import { entityHandler } from "./behavior/entity";
import { featureHandler } from "./behavior/feature";
import { featureRuleHandler } from "./behavior/feature_rule";
import { itemHandler } from "./behavior/item";
import { attachableHandler } from "./resource/attachable";
import { clientAnimationHandler } from "./resource/client_animation";
import { clientAnimationControllerHandler } from "./resource/client_animation_controller";
import { clientBlockHandler } from "./resource/client_block";
import { clientEntityHandler } from "./resource/client_entity";
import { geometryHandler } from "./resource/geometry";
import { itemTextureHandler } from "./resource/item_texture";
import { particleHandler } from "./resource/particle";
import { renderControllerHandler } from "./resource/render_controller";
import { soundDefinitionHandler } from "./resource/sound_definition";
import { terrainTextureHandler } from "./resource/terrain_texture";

export const handlerList = [
  // BP
  animationHandler,
  animationControllerHandler,
  blockHandler,
  entityHandler,
  featureRuleHandler,
  featureHandler,
  itemHandler,
  // RP
  attachableHandler,
  clientAnimationControllerHandler,
  clientAnimationHandler,
  clientBlockHandler,
  clientEntityHandler,
  geometryHandler,
  itemTextureHandler,
  particleHandler,
  renderControllerHandler,
  soundDefinitionHandler,
  terrainTextureHandler,
];
