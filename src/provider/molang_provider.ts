import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { legend, projectGlob } from "../constants";
import { molangSemanticLocations } from "../core/molang_location";
import { isJsonPathMatch } from "../utils/jsonc";

type SemanticToken = {
  pattern: RegExp;
  type: string;
  modifiers?: string[];
};

const semantics: SemanticToken[] = [
  {
    pattern: /\b(q|v|t|c|query|variable|temp|context|math|array|geometry|material|texture)(?=\.)/gi,
    type: "class",
  },
  {
    pattern: /(?<=\b(q|v|t|c|query|variable|temp|context|math|array|geometry|material|texture))\.[\w.]+\b/gi,
    type: "function",
  },
  {
    pattern: /\b(break|continue|for_each|loop|return)\b/gi,
    type: "keyword",
  },
  {
    pattern: /\bthis\b/gi,
    type: "macro",
  },
  {
    pattern: /(\b|\.)[\d.]+f?\b/g,
    type: "number",
  },
  {
    pattern: /[-+/*=<>!&|,;:?]+/g,
    type: "operator",
  },
  {
    pattern: /[\(\)\{\}\[\]]/g,
    type: "enumMember",
  },
  {
    pattern: /'[^']*'/g,
    type: "regexp",
  },
];

export class MolangProvider implements vscode.DocumentSemanticTokensProvider {
  provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.ProviderResult<vscode.SemanticTokens> {
    if (!isMatch(document.uri.fsPath, `**/${projectGlob}/**/*.json`)) {
      return;
    }
    const tokens = new vscode.SemanticTokensBuilder(legend);
    JSONC.visit(document.getText(), {
      onLiteralValue(text, offset, _length, _startLine, _startCharacter, pathSupplier) {
        if (typeof text !== "string" || text[0] === "@" || text[0] === "/") {
          return;
        }
        const jsonPath = pathSupplier();
        if (!molangSemanticLocations.some((targetPath) => isJsonPathMatch(jsonPath, targetPath))) {
          return;
        }
        const basePos = document.positionAt(offset + 1);
        for (const { pattern, type, modifiers } of semantics) {
          let match;
          while ((match = pattern.exec(text))) {
            const start = basePos.translate(0, match.index);
            const length = match[0].length;
            const range = new vscode.Range(start, start.translate(0, length));
            tokens.push(range, type, modifiers);
          }
        }
      },
    });
    return tokens.build();
  }
}
