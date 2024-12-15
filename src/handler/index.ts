import { animationHandler } from "./behavior/animation";
import { animationControllerHandler } from "./behavior/animation_controller";
import { blockHandler } from "./behavior/block";
import { entityHandler } from "./behavior/entity";
import { itemHandler } from "./behavior/item";
import { attachableHandler } from "./resource/attachable";
import { clientAnimationHandler } from "./resource/client_animation";
import { clientAnimationControllerHandler } from "./resource/client_animation_controller";
import { clientBlockHandler } from "./resource/client_block";
import { clientEntityHandler } from "./resource/client_entity";
import { itemTextureHandler } from "./resource/item_texture";
import { particleHandler } from "./resource/particle";
import { renderControllerHandler } from "./resource/render_controller";

export const handlerList = [
  // BP
  animationHandler,
  animationControllerHandler,
  blockHandler,
  entityHandler,
  itemHandler,
  // RP
  attachableHandler,
  clientAnimationControllerHandler,
  clientAnimationHandler,
  clientBlockHandler,
  clientEntityHandler,
  itemTextureHandler,
  particleHandler,
  renderControllerHandler,
];
