import { animationHandler } from "./animation";
import { animationControllerHandler } from "./animation_controller";
import { attachableHandler } from "./attachable";
import { clientEntityHandler } from "./client_entity";
import { entityHandler } from "./entity";
import { geometryHandler } from "./geometry";
import { itemHandler } from "./item";
import { itemTextureHandler } from "./item_textures";
import { lootTableHandler } from "./loot_table";
import { manifest } from "./manifest";
import { particleHandler } from "./particle";
import { renderControllerHandler } from "./render_controller";
import { soundDefinitionsHandler } from "./sound_definitions";
import { tradingHandler } from "./trading";

export const jsonHandlers = [
  animationControllerHandler,
  animationHandler,
  attachableHandler,
  clientEntityHandler,
  entityHandler,
  geometryHandler,
  itemHandler,
  itemTextureHandler,
  lootTableHandler,
  manifest,
  particleHandler,
  renderControllerHandler,
  soundDefinitionsHandler,
  tradingHandler,
];
