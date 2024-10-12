import * as vscode from "vscode";
import { molangMath, molangQueries } from "./molang_data";

export function createMolangContext(document: vscode.TextDocument, position: vscode.Position) {
  let currentMolang: string;
  const getCurrentMolang = () => {
    if (currentMolang) {
      return currentMolang;
    }
    const range = document.getWordRangeAtPosition(position, /\b\w+\.[\w.]*(\([^\)]*\))?/);
    if (range) {
      currentMolang = document.getText(range);
      return currentMolang;
    }
  };
  return {
    getPrefix() {
      const molang = getCurrentMolang();
      if (molang) {
        return molang.split(".")[0];
      }
      return null;
    },
    getMethod() {
      const molang = getCurrentMolang();
      if (molang) {
        return molang.split(/[\.\(]/, 2)[1];
      }
    },
    getActiveParam() {
      const range = document.getWordRangeAtPosition(position, /(?<!\\)\((.*?)(?<!\\)\)/);
      if (!range) {
        return;
      }
      let text = document.getText(range);
      text = text.substring(1, text.length - 1);
      const regex = /(?:'[^']*'|[^,]+)/g;
      let index = 0;
      let match;
      while ((match = regex.exec(text))) {
        const start = range.start.translate(0, match.index);
        const end = start.translate(0, match[0].length);
        const matchRange = new vscode.Range(start, end);
        if (matchRange.contains(position)) {
          break;
        }
        index++;
      }
      return index;
    },
    getMolangData(prefix: string | null) {
      if (prefix?.match(/(q|query)/)) {
        return molangQueries;
      }
      if (prefix?.match(/[Mm]ath/)) {
        return molangMath;
      }
    },
  };
}
