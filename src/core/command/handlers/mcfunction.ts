import { bpGlob } from "../../../constants";
import { commandCompletion } from "../completion";
import { commandDefinitions } from "../definition";
import { commandSignature } from "../signature";
import { CommandHandler } from "./_types";

export const mcfunctionHandler: CommandHandler = {
  pattern: `**/${bpGlob}/functions/**/*.mcfunction`,
  index: true,
  process(ctx, rockide) {
    return {
      completions() {
        return commandCompletion(ctx, rockide);
      },
      signature() {
        return commandSignature(ctx);
      },
      definitions() {
        return commandDefinitions(ctx, rockide);
      },
    };
  },
};
