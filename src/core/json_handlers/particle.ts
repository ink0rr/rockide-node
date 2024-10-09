import { rpGlob } from "../../constants";
import { JsonHandler } from "./_type";

export const particleHandler: JsonHandler = {
  pattern: `**/${rpGlob}/particles/**/*.json`,
  index: "parse",
  process(ctx, rockide) {
    if (ctx.matchField("texture")) {
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
