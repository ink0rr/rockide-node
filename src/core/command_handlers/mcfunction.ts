import { bpGlob } from "../../constants";
import { commandCompletion, signatureHelper } from "../command_data/shared";
import { CommandHandler } from "./_types";

export const mcfunctionHandler: CommandHandler = {
  pattern: `**/${bpGlob}/functions/**/*.mcfunction`,
  index: true,
  process(ctx) {
    return {
      completions() {
        return commandCompletion(ctx);
      },
      signature() {
        return signatureHelper(ctx);
      },
    };
  },
};
