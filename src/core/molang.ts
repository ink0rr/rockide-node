type MolangTokenKind =
  | "NUMBER"
  | "STRING"
  | "THIS"
  | "METHOD"
  | "PREFIX"
  | "KEYWORD"
  | "OPERATOR"
  | "PAREN"
  | "COMMA"
  | "WHITESPACE"
  | "UNKNOWN";

type MolangToken = {
  kind: MolangTokenKind;
  value: string;
  offset: number;
  length: number;
};

const tokenPatterns: [MolangTokenKind, RegExp][] = [
  ["NUMBER", /^[0-9]+(\.[0-9]+)?f?/],
  ["STRING", /^'[^']*'/],
  ["THIS", /^this/i],
  ["METHOD", /^\.([a-zA-Z_][a-zA-Z0-9_.]*)?/],
  ["PREFIX", /^[a-zA-Z_][a-zA-Z0-9_]*/],
  ["KEYWORD", /^(break|continue|for_each|loop|return)/i],
  ["OPERATOR", /^[+\-*/%><=!&|;:?]+/],
  ["PAREN", /^[\(\)\{\}\[\]]/],
  ["COMMA", /^,/],
  ["WHITESPACE", /^\s+/],
  ["UNKNOWN", /^./],
];

export class MolangParser {
  source: string;
  tokens: MolangToken[];

  constructor(source: string) {
    this.source = source;
    this.tokens = [];

    let current = source;
    let offset = 0;
    while (current.length > 0) {
      let matched = false;
      for (const [kind, pattern] of tokenPatterns) {
        const match = current.match(pattern);
        if (match) {
          const value = match[0];
          const length = value.length;
          this.tokens.push({ kind, value, offset, length });
          current = current.slice(length);
          offset += length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        throw new Error(`Unexpected token at offset ${offset}`);
      }
    }
  }

  findIndex(offset: number) {
    return this.tokens.findIndex((token) => offset >= token.offset && offset < token.offset + token.length);
  }

  isMethodCall(offset: number) {
    const index = this.findIndex(offset);
    let depth = 0;
    for (let i = index; i >= 0; i--) {
      const token = this.tokens[i];
      if (token.kind === "PAREN" && token.value === ")") {
        depth++;
        continue;
      }
      if (token.kind === "PAREN" && token.value === "(") {
        if (depth-- === 0) {
          break;
        }
      }
    }
    depth = 0;
    for (let i = index + 1; i < this.tokens.length; i++) {
      const token = this.tokens[i];
      if (token.kind === "PAREN" && token.value === "(") {
        depth++;
        continue;
      }
      if (token.kind === "PAREN" && token.value === ")") {
        if (depth-- === 0) {
          return true;
        }
      }
    }
  }

  getMethodCall(offset: number) {
    const index = this.findIndex(offset);
    let paramIndex = 0;
    let depth = 0;
    for (let i = index; i >= 0; i--) {
      const token = this.tokens[i];
      if (token.kind === "COMMA") {
        paramIndex++;
        continue;
      }
      if (token.kind === "PAREN" && token.value === ")") {
        depth++;
        continue;
      }
      if (token.kind === "PAREN" && token.value === "(") {
        if (depth-- === 0) {
          const prefix = this.tokens[i - 2];
          const method = this.tokens[i - 1];
          if (prefix.kind === "PREFIX" && method.kind === "METHOD") {
            return {
              prefix: prefix.value,
              name: method.value.substring(1),
              paramIndex,
            };
          }
          break;
        }
      }
    }
  }
}
