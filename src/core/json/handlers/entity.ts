import * as JSONC from "jsonc-parser";
import { bpGlob } from "../../../constants";
import { JsonHandler } from "./_type";

export const entityHandler: JsonHandler = {
  pattern: `**/${bpGlob}/entities/**/*.json`,
  index: "parse",
  process(ctx, rockide) {
    if (ctx.matchField("identifier")) {
      return {
        definitions: () =>
          rockide
            .getClientEntities()
            .filter(({ values }) => values.includes(ctx.nodeValue))
            .map(({ path, root }) => ctx.createDefinition(path, root)),
      };
    }
    if (ctx.matchProperty("animations")) {
      return {
        completions: () => rockide.getAnimations().flatMap(({ values }) => values),
        definitions: () =>
          rockide
            .getAnimations()
            .filter(({ values }) => values.includes(ctx.nodeValue))
            .map(({ path, root }) => {
              const target = JSONC.findNodeAtLocation(root, [
                ctx.nodeValue.startsWith("controller") ? "animation_controllers" : "animations",
                ctx.nodeValue,
              ]);
              return ctx.createDefinition(path, target);
            }),
      };
    }
    if (ctx.matchProperty("minecraft:loot", "table")) {
      return {
        completions: () => rockide.getLootTables().map(({ bedrockPath: path }) => path),
        definitions: () =>
          rockide
            .getLootTables()
            .filter(({ bedrockPath: path }) => path === ctx.nodeValue)
            .map(({ uri }) => ctx.createDefinition(uri.fsPath)),
      };
    }
    if (
      ctx.matchProperty("minecraft:trade_table", "table") ||
      ctx.matchProperty("minecraft:economy_trade_table", "table")
    ) {
      return {
        completions: () => rockide.getTradeTables().map(({ bedrockPath: path }) => path),
        definitions: () =>
          rockide
            .getTradeTables()
            .filter(({ bedrockPath: path }) => path === ctx.nodeValue)
            .map(({ uri }) => ctx.createDefinition(uri.fsPath)),
      };
    }
    if (ctx.matchArray("animate", true)) {
      return ctx.localRef(["minecraft:entity", "description", "animations"]);
    }
    if (ctx.matchField("event")) {
      return ctx.localRef(["minecraft:entity", "events"]);
    }
    if (ctx.matchArray("component_groups")) {
      return ctx.localRef(["minecraft:entity", "component_groups"]);
    }
  },
};
