import { rpGlob } from "../../constants";
import { JsonHandler } from "./_type";

export const soundDefinitionsHandler: JsonHandler = {
  pattern: `**/${rpGlob}/sounds/sound_definitions.json`,
  index: "parse",
  process(ctx, rockide) {
    if (ctx.matchArray("sounds") || ctx.matchArrayObject("sounds", "name")) {
      return {
        completions: () => rockide.getSounds().map(({ bedrockPath: path }) => path),
        definitions: () =>
          rockide
            .getSounds()
            .filter(({ bedrockPath: path }) => path === ctx.nodeValue)
            .map(({ uri }) => ctx.createDefinition(uri.fsPath)),
      };
    }
  },
};
