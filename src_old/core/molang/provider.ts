import * as JSONC from "jsonc-parser";
import { isMatch } from "micromatch";
import * as vscode from "vscode";
import { projectGlob } from "../../constants";
import { legend, SemanticToken } from "../../semantics";
import { createMolangContext } from "./context";

export class MolangProvider implements vscode.DocumentSemanticTokensProvider, vscode.SignatureHelpProvider {
  provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.ProviderResult<vscode.SemanticTokens> {
    const root = JSONC.parseTree(document.getText());
    if (!root) {
      return;
    }
    const tokens = new vscode.SemanticTokensBuilder(legend);
    const assignTokens = (node: JSONC.Node) => {
      const text = node.value;
      if (typeof text !== "string" || text.startsWith("@") || text.startsWith("/")) {
        return;
      }
      if (
        !text.match(/[0-9*/+-]/) &&
        !text.match(/\b(q|v|t|c|query|variable|temp|context|math|array|geometry|material|texture)(?=\.)/i)
      ) {
        return;
      }
      const basePos = document.positionAt(node.offset + 1);
      for (const { pattern, type, modifiers } of semantics) {
        let match;
        while ((match = pattern.exec(text))) {
          const start = basePos.translate(0, match.index);
          const length = match[0].length;
          const range = new vscode.Range(start, start.translate(0, length));
          tokens.push(range, type, modifiers);
        }
      }
    };
    const scan = (node: JSONC.Node) => {
      if (node.type === "string" && node.parent?.type === "array") {
        return assignTokens(node);
      }
      if (node.type === "property") {
        const child = node.children?.at(1);
        if (child?.type === "string") {
          return assignTokens(child);
        }
      }
      for (const child of node.children ?? []) {
        scan(child);
      }
    };
    scan(root);
    return tokens.build();
  }
  provideSignatureHelp(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.SignatureHelp> {
    if (!isMatch(document.uri.fsPath, `**/${projectGlob}/**/*.json`)) {
      return;
    }
    if (!document.getWordRangeAtPosition(position, /\([^\)]*\)/)) {
      return;
    }
    const ctx = createMolangContext(document, position);
    const signatureHelp = new vscode.SignatureHelp();
    const prefix = ctx.getPrefix();
    const molangData = ctx.getMolangData(prefix);
    const methodName = ctx.getMethod();
    const molang = molangData?.find((v) => v.name === methodName);
    if (!molang?.signature) {
      return;
    }
    let activeParameter = ctx.getActiveParam();
    if (activeParameter === undefined) {
      return;
    }
    const parameters = molang.signature
      .replace(/(^\(|\):.*$)/g, "")
      .split(", ")
      .map((label) => ({ label }));
    if (parameters.at(-1)?.label.startsWith("...")) {
      activeParameter = Math.min(activeParameter, parameters.length - 1);
    }
    signatureHelp.signatures = [
      {
        label: `${prefix}.${molang.name}${molang.signature}`,
        activeParameter,
        parameters,
        documentation: molang.description,
      },
    ];
    return signatureHelp;
  }
}

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
    pattern: /\bthis\b/gi,
    type: "macro",
  },
  {
    pattern: /(?<!\.)\b\d+(\.\d+)?(?!\.)f?\b/g,
    type: "number",
  },
  {
    pattern: /[=<>!&|,;?]+/g,
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
