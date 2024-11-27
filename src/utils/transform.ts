import * as JSONC from "jsonc-parser";

/**
 * Skip if a node is a property key node
 */
export function skipKey(node: JSONC.Node) {
  if (node.parent?.type === "property" && node === node.parent.children?.[0]) {
    return null;
  }
  return node.value;
}
