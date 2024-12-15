import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  outDir: "out",
  external: ["vscode"],
  treeshake: true,
});
