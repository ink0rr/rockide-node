import * as vscode from "vscode";
import { CommandContext } from "./context_n";

export function commandSignature(ctx: CommandContext): vscode.SignatureHelp | undefined {
  if (ctx.isCommment()) {
    return;
  }

  const commandSequences = ctx.getCommandSequences();
  if (!commandSequences.length) {
    return;
  }

  const signature = new vscode.SignatureHelp();
  const currentCommand = commandSequences[commandSequences.length - 1];
  const overloads = currentCommand.overloads.filter(({ isMatch }) => isMatch);

  // Handle subcommand
  if (currentCommand.command === "execute") {
    const runArg = overloads[0].args[0];
    const subCommandArg = overloads[0].args[1];
    if (runArg.value === "run" && runArg.isMatch && !subCommandArg.isMatch) {
      return;
    }
  }

  const sigs: vscode.SignatureInformation[] = overloads.map(({ args }) => {
    const { command, documentation } = currentCommand;
    const label = `${command} ${args
      .map(
        ({ signatureValue, originalValue }) =>
          signatureValue ?? (Array.isArray(originalValue) ? `<${originalValue.join("|")}>` : originalValue),
      )
      .join(" ")}`;

    const parameters = args.map(({ originalValue, signatureValue }) => ({
      label: signatureValue ?? (Array.isArray(originalValue) ? `<${originalValue.join("|")}>` : originalValue),
    }));

    return {
      label,
      documentation,
      parameters,
    };
  });
  signature.activeParameter = overloads[0].args.findIndex(({ isMatch }) => !isMatch);
  signature.signatures = sigs;
  return signature;
}
