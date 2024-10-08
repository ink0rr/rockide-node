import { animationHandler } from "./data/animation";
import { animationControllerHandler } from "./data/animation_controller";
import { attachableHandler } from "./data/attachable";
import { clientEntityHandler } from "./data/client_entity";
import { entityHandler } from "./data/entity";
import { geometryHandler } from "./data/geometry";
import { itemHandler } from "./data/item";
import { itemTextureHandler } from "./data/item_textures";
import { lootTableHandler } from "./data/loot_table";
import { manifest } from "./data/manifest";
import { particleHandler } from "./data/particle";
import { renderControllerHandler } from "./data/render_controller";
import { soundDefinitionsHandler } from "./data/sound_definitions";
import { tradingHandler } from "./data/trading";

export const fileHandlers = [
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
