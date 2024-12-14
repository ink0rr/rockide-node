import { animationHandler } from "./behavior/animation";
import { animationControllerHandler } from "./behavior/animation_controller";
import { blockHandler } from "./behavior/block";
import { entityHandler } from "./behavior/entity";
import { itemHandler } from "./behavior/item";
import { clientAnimationHandler } from "./resource/client_animation";
import { clientAnimationControllerHandler } from "./resource/client_animation_controller";
import { clientBlockHandler } from "./resource/client_block";
import { clientEntityHandler } from "./resource/client_entity";
import { itemTextureHandler } from "./resource/item_texture";

export const handlerList = [
  // BP
  animationHandler,
  animationControllerHandler,
  blockHandler,
  entityHandler,
  itemHandler,
  // RP
  clientAnimationControllerHandler,
  clientAnimationHandler,
  clientBlockHandler,
  clientEntityHandler,
  itemTextureHandler,
];
