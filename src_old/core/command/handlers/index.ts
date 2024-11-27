import { animationHandler } from "./animation";
import { animationControllerHandler } from "./animation_controller";
import { dialogueHandler } from "./dialogue";
import { entityHandler } from "./entity";
import { mcfunctionHandler } from "./mcfunction";

export const commandHandlers = [mcfunctionHandler] as const;
export const jsonCommandHandlers = [
  animationControllerHandler,
  animationHandler,
  entityHandler,
  dialogueHandler,
] as const;
