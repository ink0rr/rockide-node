import { rpGlob } from "../../../constants";
import { JsonHandler } from "./_type";

export const itemTextureHandler: JsonHandler = {
  pattern: `**/${rpGlob}/textures/item_texture.json`,
  index: "parse",
  process(ctx, rockide) {
    if (ctx.matchField("textures")) {
      return {
        completions: () => rockide.getTextures().map(({ bedrockPath: path }) => path),
        definitions: () =>
          rockide
            .getTextures()
            .filter(({ bedrockPath: path }) => path === ctx.nodeValue)
            .map(({ uri }) => ctx.createDefinition(uri.fsPath)),
      };
    }
  },
};
