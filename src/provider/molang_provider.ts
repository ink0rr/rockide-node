import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { legend, projectGlob } from "../constants";
import { MolangParser } from "../core/molang";
import { getMolangData, molangPrefixes } from "../core/molang_data";
import { isMolangLocation, molangSemanticLocations } from "../core/molang_location";
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

export class MolangProvider
  implements vscode.DocumentSemanticTokensProvider, vscode.CompletionItemProvider, vscode.SignatureHelpProvider
{
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
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.CompletionItem[]> {
    const offset = document.offsetAt(position);
    const location = JSONC.getLocation(document.getText(), offset);
    if (!isMolangLocation(location)) {
      return;
    }
    const node = location.previousNode!;
    const molangOffset = offset - node.offset - 2; // -2 to offset quotes
    const parser = new MolangParser(node.value);
    const index = parser.findIndex(molangOffset);
    const token = parser.tokens[index];
    if (token.kind === "PREFIX") {
      return molangPrefixes.map((name) => new vscode.CompletionItem(name));
    }
    const prefix = parser.tokens[index - 1];
    if (token.kind !== "METHOD" || prefix.kind !== "PREFIX" || token.value.lastIndexOf(".") !== 0) {
      return;
    }
    return getMolangData(prefix.value)?.map(({ name, description, signature }) => {
      const item = new vscode.CompletionItem(`${prefix.value}.${name}`, vscode.CompletionItemKind.Method);
      item.detail = `${name}${signature}`;
      item.documentation = description;
      return item;
    });
  }
  provideSignatureHelp(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.SignatureHelp> {
    const offset = document.offsetAt(position);
    const location = JSONC.getLocation(document.getText(), offset);
    if (!isMolangLocation(location)) {
      return;
    }
    const node = location.previousNode!;
    const molangOffset = offset - node.offset - 2; // -2 to offset quotes
    const parser = new MolangParser(node.value);
    if (!parser.isMethodCall(molangOffset)) {
      return;
    }
    const method = parser.getMethodCall(molangOffset);
    if (!method) {
      return;
    }
    const molang = getMolangData(method.prefix)?.find((data) => data.name === method.name);
    if (!molang) {
      return;
    }
    const signatureHelp = new vscode.SignatureHelp();
    const parameters = molang.signature
      .replace(/(^\(|\):.*$)/g, "")
      .split(", ")
      .map((label) => ({ label }));
    let activeParameter = method.paramIndex;
    if (parameters.at(-1)?.label.startsWith("...")) {
      activeParameter = Math.min(activeParameter, parameters.length - 1);
    }
    signatureHelp.signatures = [
      {
        label: `${method.prefix}.${molang.name}${molang.signature}`,
        activeParameter,
        parameters,
        documentation: molang.description,
      },
    ];
    return signatureHelp;
  }
}
