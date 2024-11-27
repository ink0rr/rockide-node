import { describe, expect, it } from "bun:test";
import * as JSONC from "jsonc-parser";
import { findNodesAtPath, isJsonPathMatch } from "./jsonc";

describe("findNodesAtPath", () => {
  it("should find nodes at a given path", () => {
    const json = `{
      "a": {
        "b": {
          "c": 1
        }
      }
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "b", "c"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].value).toBe(1);
  });

  it("should handle wildcard at the end", () => {
    const json = `{
      "a": {
        "b": 1,
        "c": 2
      }
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "*"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(2);
    expect(nodes.map((node) => node.children![1].value)).toEqual([1, 2]);
  });

  it("should handle nested wildcard", () => {
    const json = `{
      "a": {
        "b": {
          "c": 1
        },
        "d": {
          "e": 2
        }
      }
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "*", "c"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].value).toBe(1);
  });

  it("should handle double wildcard", () => {
    const json = `{
      "a": {
        "b": {
          "c": 1
        },
        "d": {
          "e": 2
        }
      }
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "**", "e"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].value).toBe(2);
  });

  it("should throw error for invalid path", () => {
    const json = `{
      "a": {
        "b": 1
      }
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "**"];
    expect(() => findNodesAtPath(root!, path)).toThrowError("Invalid JSON path: a,**");
  });

  // Array test
  it("should find nodes at a given path in an array", () => {
    const json = `{
      "a": [
        {
          "b": 1
        },
        {
          "b": 2
        }
      ]
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "*", "b"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(2);
    expect(nodes.map((node) => node.value)).toEqual([1, 2]);
  });

  it("should handle wildcard at the end in an array", () => {
    const json = `{
      "a": [
        {
          "b": 1
        },
        {
          "c": 2
        }
      ]
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "*", "*"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(2);
    expect(nodes.map((node) => node.children![1].value)).toEqual([1, 2]);
  });

  it("should handle nested wildcard in an array", () => {
    const json = `{
      "a": [
        {
          "b": {
            "c": 1
          }
        },
        {
          "d": {
            "e": 2
          }
        }
      ]
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "*", "*", "c"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].value).toBe(1);
  });

  it("should handle double wildcard in an array", () => {
    const json = `{
      "a": [
        {
          "b": {
            "c": 1
          }
        },
        {
          "d": {
            "e": 2
          }
        }
      ]
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "*", "**", "e"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].value).toBe(2);
  });

  it("should handle wildcard for array values", () => {
    const json = `{
      "a": {
        "b": [1, 2]
      }
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "b", "*"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(2);
    expect(nodes.map((node) => node.value)).toEqual([1, 2]);
  });

  it("should handle nested wildcard for array values", () => {
    const json = `{
      "a": {
        "b": [[1], [2]]
      }
    }`;
    const root = JSONC.parseTree(json);
    const path = ["a", "b", "*", "*"];
    const nodes = findNodesAtPath(root!, path);
    expect(nodes).toHaveLength(2);
    expect(nodes.map((node) => node.value)).toEqual([1, 2]);
  });
});

describe("isJsonPathMatch", () => {
  it("should match exact paths", () => {
    const jsonPath = ["a", "b", "c"];
    const targetPath = ["a", "b", "c"];
    expect(isJsonPathMatch(jsonPath, targetPath)).toBe(true);
  });

  it("should match paths with wildcard", () => {
    const jsonPath = ["a", "b", "c"];
    const targetPath = ["a", "*", "c"];
    expect(isJsonPathMatch(jsonPath, targetPath)).toBe(true);
  });

  it("should match paths with double wildcard", () => {
    const jsonPath = ["a", "d", "b", "c"];
    const targetPath = ["a", "**", "c"];
    expect(isJsonPathMatch(jsonPath, targetPath)).toBe(true);
  });

  it("should not match different paths", () => {
    const jsonPath = ["a", "b", "c"];
    const targetPath = ["a", "b", "d"];
    expect(isJsonPathMatch(jsonPath, targetPath)).toBe(false);
  });

  it("should match paths with trailing double wildcard", () => {
    const jsonPath = ["a", "b", "c"];
    const targetPath = ["a", "**"];
    expect(isJsonPathMatch(jsonPath, targetPath)).toBe(true);
  });

  it("should match paths with leading double wildcard", () => {
    const jsonPath = ["a", "b", "c"];
    const targetPath = ["**", "c"];
    expect(isJsonPathMatch(jsonPath, targetPath)).toBe(true);
  });
});
