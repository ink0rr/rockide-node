import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import { relative } from "path";
import * as vscode from "vscode";
import { bpGlob, NullNode, projectGlob, rpGlob } from "./constants";
import { jsonHandlers } from "./core/json/handlers";

export type IndexedData = {
  path: string;
  root: JSONC.Node;
  values: string[];
};

export type AssetData = {
  uri: vscode.Uri;
  bedrockPath: string;
};

export class Rockide {
  diagnostics = vscode.languages.createDiagnosticCollection("rockide");
  jsonFiles = new Map<string, JSONC.Node>();
  jsonAssets: AssetData[] = [];
  mcfunctions = new Set<string>(); // path
  structures = new Set<string>(); // path
  #tags = new Map<string, string[]>(); // path -> tags
  #objectives = new Map<string, string[]>(); // path -> objectives
  #tickingareas = new Map<string, string[]>(); // path -> tickingareas
  assets: AssetData[] = [];

  async checkWorkspace() {
    for (const path of await vscode.workspace.findFiles("**/manifest.json")) {
      const file = await vscode.workspace.openTextDocument(path);
      const json = JSONC.parse(file.getText());
      if ("header" in json && "format_version" in json) {
        continue;
      }
      return false;
    }
    return true;
  }

  async indexWorkspace() {
    if (!vscode.workspace.workspaceFolders) {
      return;
    }
    if (vscode.workspace.workspaceFolders.length > 1) {
      return vscode.window.showInformationMessage("Multiple workspace is currently not supported.");
    }
    const workspace = vscode.workspace.workspaceFolders[0];
    this.jsonFiles.clear();
    this.assets = [];
    vscode.window.withProgress({ title: "Indexing", location: vscode.ProgressLocation.Window }, async (progress) => {
      const fileList = await vscode.workspace.findFiles(`**/${projectGlob}/**/*.json`, "{.*,build}/**");
      const increment = 100 / fileList.length;
      for (const uri of fileList) {
        progress.report({ message: relative(workspace.uri.fsPath, uri.fsPath), increment });
        await this.indexJson(uri);
        await this.indexTags(uri);
        await this.indexObjective(uri);
        await this.indexTickingAreas(uri);
      }
      const assetList = await vscode.workspace.findFiles(`**/${rpGlob}/**/*.{png,tga,fsb,ogg,wav}`, "{.*,build}/**");
      for (const uri of assetList) {
        this.indexAsset(uri);
      }
      const mcfunctionList = await vscode.workspace.findFiles(
        `**/${bpGlob}/functions/**/*.mcfunction`,
        "{.*,build}/**",
      );
      for (const uri of mcfunctionList) {
        this.indexMcfunction(uri);
        await this.indexTags(uri);
        await this.indexObjective(uri);
        await this.indexTickingAreas(uri);
      }
      const structureList = await vscode.workspace.findFiles(
        `**/${bpGlob}/structures/**/*.mcstructure`,
        "{.*,build}/**",
      );
      for (const uri of structureList) {
        this.indexMcstructure(uri);
      }
    });
  }

  async indexJson(uri: vscode.Uri) {
    for (const handler of jsonHandlers) {
      if (!handler.index || !isMatch(uri.fsPath, handler.pattern)) {
        continue;
      }
      if (handler.index === "parse") {
        const document = await vscode.workspace.openTextDocument(uri);
        const root = JSONC.parseTree(document.getText()) ?? NullNode;
        this.jsonFiles.set(uri.fsPath, root);
        break;
      }
      const path = uri.fsPath.replaceAll("\\", "/").split(/(behavior_pack|[^\\/]*?bp|bp_[^\\/]*?)\//i)[2];
      if (path) {
        this.jsonAssets.push({
          uri,
          bedrockPath: path,
        });
      }
      break;
    }
  }

  indexMcfunction(uri: vscode.Uri) {
    this.mcfunctions.add(uri.fsPath.replace(/\\/g, "/"));
  }

  indexMcstructure(uri: vscode.Uri) {
    this.structures.add(uri.fsPath.replace(/\\/g, "/"));
  }

  async indexTags(uri: vscode.Uri) {
    const regex = /tag\s(@\w+|\*)((\s)?(\[\])?)?\sadd\s(\w+|\"\w+\")/g;
    const document = await vscode.workspace.openTextDocument(uri);
    if (uri.fsPath.endsWith(".json")) {
      // const json = JSONC.parseTree(document.getText()) ?? NullNode;
      // matchproperty
      // todo: handle json
      return;
    }
    if (uri.fsPath.endsWith(".mcfunction")) {
      const matches = Array.from(document.getText().matchAll(regex));
      const tagName = matches[0]?.[5];
      if (!tagName) {
        return;
      }
      const path = uri.fsPath;
      const old = this.#tags.get(path) ?? [];
      this.#tags.set(path, old.concat(tagName));
      return;
    }
    console.error("Unknown file passed to indexTags:", uri.fsPath);
  }

  async indexObjective(uri: vscode.Uri) {
    const regex = /scoreboard\sobjectives\sadd\s(\w+|\"[^\"]+\")/g;
    const document = await vscode.workspace.openTextDocument(uri);
    if (uri.fsPath.endsWith(".json")) {
      // const json = JSONC.parseTree(document.getText()) ?? NullNode;
      // matchproperty
      // todo: handle json
      return;
    }
    if (uri.fsPath.endsWith(".mcfunction")) {
      const matches = Array.from(document.getText().matchAll(regex));
      const objectiveName = matches[0]?.[1];
      if (!objectiveName) {
        return;
      }
      const path = uri.fsPath;
      const old = this.#objectives.get(path) ?? [];
      this.#objectives.set(path, old.concat(objectiveName));
      return;
    }
    console.error("Unknown file passed to indexObjectives:", uri.fsPath);
  }

  async indexTickingAreas(uri: vscode.Uri) {
    const regex = /tickingarea\sadd\s(.*)(?<=([\d~^]))(\s)(\w+)/g;
    const document = await vscode.workspace.openTextDocument(uri);
    if (uri.fsPath.endsWith(".json")) {
      // const json = JSONC.parseTree(document.getText()) ?? NullNode;
      // matchproperty
      // todo: handle json
      return;
    }
    if (uri.fsPath.endsWith(".mcfunction")) {
      const matches = Array.from(document.getText().matchAll(regex));
      const tickingAreaName = matches[0]?.[4];
      if (!tickingAreaName) {
        return;
      }
      const path = uri.fsPath;
      const old = this.#tickingareas.get(path) ?? [];
      this.#tickingareas.set(path, old.concat(tickingAreaName));
      return;
    }
    console.error("Unknown file passed to indexTickingAreas:", uri.fsPath);
  }

  indexAsset(uri: vscode.Uri) {
    if (!uri.fsPath.match(/\.(png|tga|fsb|ogg|wav)$/)) {
      return;
    }
    const path = uri.fsPath.replaceAll("\\", "/").split(/(resource_pack|[^\\/]*?rp|rp_[^\\/]*?)\//i)[2];
    if (path) {
      this.assets.push({
        uri,
        bedrockPath: path.replace(/\.\w+$/, ""),
      });
    }
  }

  get tags() {
    const tags = Array.from(this.#tags.values());
    return {
      has: (name: string) => {
        for (const values of tags) {
          const ok = values.find((v) => v === name);
          if (ok) {
            return true;
          }
        }
        return false;
      },
      deleteByPath: (path: string) => {
        this.#tags.delete(path);
      },
      values: () => {
        return tags.flat().filter((v, i, s) => s.findIndex((v2) => v2 === v) === i);
      },
    };
  }

  get objectives() {
    const objectives = Array.from(this.#objectives.values());
    return {
      has: (name: string) => {
        for (const values of objectives) {
          const ok = values.find((v) => v === name);
          if (ok) {
            return true;
          }
        }
        return false;
      },
      deleteByPath: (path: string) => {
        this.#objectives.delete(path);
      },
      values: () => {
        return objectives.flat().filter((v, i, s) => s.findIndex((v2) => v2 === v) === i);
      },
    };
  }

  get tickingareas() {
    const tickingareas = Array.from(this.#tickingareas.values());
    return {
      has: (name: string) => {
        for (const values of tickingareas) {
          const ok = values.find((v) => v === name);
          if (ok) {
            return true;
          }
        }
        return false;
      },
      deleteByPath: (path: string) => {
        this.#tickingareas.delete(path);
      },
      values: () => {
        return tickingareas.flat().filter((v, i, s) => s.findIndex((v2) => v2 === v) === i);
      },
    };
  }

  getAnimations(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${bpGlob}/{animations,animation_controllers}/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        return { path, root, values: Object.keys(json.animations ?? json.animation_controllers ?? {}) };
      });
  }

  getClientAnimations(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${rpGlob}/{animations,animation_controllers}/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        return { path, root, values: Object.keys(json.animations ?? json.animation_controllers ?? {}) };
      });
  }

  getAttachables(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${rpGlob}/attachables/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        const identifier = json["minecraft:attachable"]?.description?.identifier;
        return { path, root, values: identifier ? [identifier] : [] };
      });
  }

  getEntities(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${bpGlob}/entities/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        const identifier = json["minecraft:entity"]?.description?.identifier;
        return { path, root, values: identifier ? [identifier] : [] };
      });
  }

  getClientEntities(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${rpGlob}/entity/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        const identifier = json["minecraft:client_entity"]?.description?.identifier;
        return { path, root, values: identifier ? [identifier] : [] };
      });
  }

  getItems(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${bpGlob}/items/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        const identifier = json["minecraft:item"]?.description?.identifier;
        return { path, root, values: identifier ? [identifier] : [] };
      });
  }

  getGeometries(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${rpGlob}/models/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        if (Array.isArray(json["minecraft:geometry"])) {
          return {
            path,
            root,
            values: json["minecraft:geometry"]
              .map((geo) => geo.description?.identifier)
              .filter((key: string | undefined) => key?.startsWith("geometry.")),
          };
        }
        delete json.format_version;
        return {
          path,
          root,
          values: Object.keys(json).filter((key) => key.startsWith("geometry.")),
        };
      });
  }

  getRenderControllers(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${rpGlob}/render_controllers/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        return { path, root, values: Object.keys(json.render_controllers ?? {}) };
      });
  }

  getParticles(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${rpGlob}/particles/**/*.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        const identifier = json.particle_effect?.description?.identifier;
        return { path, root, values: identifier ? [identifier] : [] };
      });
  }

  getItemIcons(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${rpGlob}/textures/item_texture.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        return { path, root, values: Object.keys(json.texture_data) };
      });
  }

  getSoundDefinitions(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${rpGlob}/sounds/sound_definitions.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        return { path, root, values: Object.keys(json.sound_definitions) };
      });
  }

  getManifests(): IndexedData[] {
    return [...this.jsonFiles]
      .filter(([path]) => isMatch(path, `**/${projectGlob}/manifest.json`))
      .map(([path, root]) => {
        const json = JSONC.getNodeValue(root);
        const uuid = json?.header?.uuid;
        return { path, root, values: uuid ? [uuid] : uuid };
      });
  }

  getTextures() {
    return this.assets.filter(({ bedrockPath: path }) => path.startsWith("textures/"));
  }

  getSounds() {
    return this.assets.filter(({ bedrockPath: path }) => path.startsWith("sounds/"));
  }

  getLootTables() {
    return this.jsonAssets.filter(({ bedrockPath: path }) => path.startsWith("loot_tables/"));
  }

  getTradeTables() {
    return this.jsonAssets.filter(({ bedrockPath: path }) => path.startsWith("trading/"));
  }

  getMcfunctions() {
    return this.mcfunctions;
  }
}
