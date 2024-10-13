import * as JSONC from "jsonc-parser";
import { rpGlob } from "../../constants";
import { JsonHandler } from "./_type";

export const clientEntityHandler: JsonHandler = {
  pattern: `**/${rpGlob}/entity/**/*.json`,
  index: "parse",
  process(ctx, rockide) {
    if (ctx.matchProperty("animations")) {
      return {
        completions: () => rockide.getClientAnimations().flatMap(({ values }) => values),
        definitions: () =>
          rockide
            .getClientAnimations()
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
    if (ctx.matchProperty("geometry")) {
      return {
        completions: () => rockide.getGeometries().flatMap(({ values }) => values.map((v) => v.split(":")[0])),
        definitions: () =>
          rockide
            .getGeometries()
            .filter(({ values }) => values.map((v) => v.split(":")[0]).includes(ctx.nodeValue))
            .flatMap(({ path, root, values }) => {
              const geometryId = values.find((v) => v.split(":")[0] === ctx.nodeValue)!;
              const target = JSONC.findNodeAtLocation(root, [geometryId]);
              return ctx.createDefinition(path, target ?? root);
            }),
      };
    }
    if (ctx.matchProperty("textures")) {
      return {
        completions: () => rockide.getTextures().map(({ bedrockPath: path }) => path),
        definitions: () =>
          rockide
            .getTextures()
            .filter(({ bedrockPath: path }) => path === ctx.nodeValue)
            .map(({ uri }) => ctx.createDefinition(uri.fsPath)),
      };
    }
    if (ctx.matchProperty("particle_effects")) {
      return {
        completions: () => rockide.getParticles().flatMap(({ values }) => values),
        definitions: () =>
          rockide
            .getParticles()
            .filter(({ values }) => values.includes(ctx.nodeValue))
            .map(({ path, root }) => ctx.createDefinition(path, root)),
      };
    }
    if (ctx.matchProperty("sound_effects")) {
      return {
        completions: () => rockide.getSoundDefinitions().flatMap(({ values }) => values),
        definitions: () =>
          rockide
            .getSoundDefinitions()
            .filter(({ values }) => values.includes(ctx.nodeValue))
            .map(({ path, root }) => {
              const target = JSONC.findNodeAtLocation(root, ["sound_definitions", ctx.nodeValue]);
              return ctx.createDefinition(path, target);
            }),
      };
    }
    if (ctx.matchProperty("spawn_egg", "texture")) {
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
    if (ctx.matchArray("render_controllers", true)) {
      return {
        completions: () => rockide.getRenderControllers().flatMap(({ values }) => values),
        definitions: () =>
          rockide
            .getRenderControllers()
            .filter(({ values }) => values.includes(ctx.nodeValue))
            .map(({ path, root }) => {
              const target = JSONC.findNodeAtLocation(root, ["render_controllers", ctx.nodeValue]);
              return ctx.createDefinition(path, target);
            }),
      };
    }
    if (ctx.matchArray("animate", true)) {
      return ctx.localRef(["minecraft:client_entity", "description", "animations"]);
    }
  },
};
