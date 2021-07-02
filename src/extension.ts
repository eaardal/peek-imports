import * as vscode from "vscode";
import { peekImports } from "./peekImportsCommand";

export function activate(context: vscode.ExtensionContext) {
  let disposePeekImports = vscode.commands.registerCommand(
    "peeky.peekImports",
    peekImports
  );

  context.subscriptions.push(disposePeekImports);
}

export function deactivate() {}
