import * as JSONC from "jsonc-parser";
import { bpGlob } from "../../constants";
import { JsonHandler } from "./_type";

export const itemHandler: JsonHandler = {
  pattern: `**/${bpGlob}/items/**/*.json`,
  index: "parse",
  process(ctx, rockide) {
    if (ctx.matchField("identifier")) {
      return {
        definitions: () =>
          rockide
            .getAttachables()
            .filter(({ values }) => values.includes(ctx.nodeValue))
            .map(({ path, root }) => ctx.createDefinition(path, root)),
      };
    }
    if (ctx.matchField("minecraft:icon") || ctx.matchProperty("textures")) {
      return {
        completions: () => rockide.getItemIcons().flatMap(({ values }) => values),
        definitions: () =>
          rockide
            .getItemIcons()
            .map(({ path, root }) => {
              const target = JSONC.findNodeAtLocation(root, ["texture_data", ctx.nodeValue]);
              if (!target) {
                return;
              }
              return ctx.createDefinition(path, target);
            })
            .filter((v) => v !== undefined),
      };
    }
  },
};
