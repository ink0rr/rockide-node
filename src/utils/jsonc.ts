import * as JSONC from "jsonc-parser";

export function findNodesAtPath(root: JSONC.Node, jsonPath: string[]) {
  const result: JSONC.Node[] = [];
  const visitNodes = (node: JSONC.Node, keys: string[]) => {
    if (keys.length === 0) {
      throw new Error(`Unhandled empty keys: ${jsonPath}`);
    }
    const [currentKey, ...remainingKeys] = keys;
    if (!currentKey) {
      throw new Error(`Invalid JSON path: ${jsonPath}`);
    }

    if (remainingKeys.length === 0) {
      if (currentKey === "**") {
        throw new Error(`Invalid JSON path: ${jsonPath}`);
      }
      if (currentKey === "*") {
        for (const child of node.children ?? []) {
          result.push(child);
        }
        return;
      }
      const nextNode = JSONC.findNodeAtLocation(node, [currentKey]);
      if (nextNode) {
        result.push(nextNode);
      }
      return;
    }

    if (currentKey === "*") {
      for (const child of node.children ?? []) {
        if (child.type === "property") {
          visitNodes(child.children![1], remainingKeys);
        } else {
          visitNodes(child, remainingKeys);
        }
      }
      return;
    }
    if (currentKey === "**") {
      for (const child of node.children ?? []) {
        if (child.type === "property" && child.children![0].value === remainingKeys[0]) {
          visitNodes(node, remainingKeys);
        } else {
          visitNodes(child, keys);
        }
      }
      return;
    }
    const nextNode = JSONC.findNodeAtLocation(node, [currentKey]);
    if (nextNode) {
      visitNodes(nextNode, remainingKeys);
    }
  };
  visitNodes(root, jsonPath);
  return result;
}

export function isJsonPathMatch(jsonPath: JSONC.JSONPath, targetPath: string[]) {
  let jsonIndex = 0;
  let pathIndex = 0;

  while (jsonIndex < jsonPath.length && pathIndex < targetPath.length) {
    if (targetPath[pathIndex] === "**") {
      // Return early if "**" at the end of the target path
      if (pathIndex === targetPath.length - 1) {
        return true;
      }

      // Attempt to find a matching segment for the next part of the path after "**"
      while (jsonIndex < jsonPath.length && jsonPath[jsonIndex] !== targetPath[pathIndex + 1]) {
        jsonIndex++;
      }
      pathIndex++;
      continue;
    }
    // Match current segment
    if (targetPath[pathIndex] === "*" || jsonPath[jsonIndex] === targetPath[pathIndex]) {
      jsonIndex++;
      pathIndex++;
    } else {
      // Segment does not match
      break;
    }
  }

  // Check if all jsonPath segments were matched
  return jsonIndex === jsonPath.length && pathIndex === targetPath.length;
}
