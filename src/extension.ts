import * as vscode from "vscode";
import { peekImports } from "./peekImportsCommand";

export function activate(context: vscode.ExtensionContext) {
  let disposePeekImports = vscode.commands.registerCommand(
    "lens-flare.peekImports",
    peekImports
  );

  context.subscriptions.push(disposePeekImports);

  // vscode.workspace.onDidCloseTextDocument((doc) => {
  //   console.log(`onDidCloseTextDocument: ${doc}`);
  // });
  // vscode.window.onDidChangeActiveTextEditor((args) => {
  //   console.log(`onDidChangeActiveTextEditor: ${args}`);
  // });
  // vscode.window.onDidChangeTextEditorSelection((args) => {
  //   console.log(`onDidChangeTextEditorSelection: ${args}`);
  // });
  // vscode.window.onDidChangeVisibleTextEditors((args) => {
  //   console.log(`onDidChangeTextEditorSelection: ${args}`);
  // });
  // vscode.window.onDidChangeWindowState((args) => {
  //   console.log(`onDidChangeWindowState: ${args}`);
  // });
}

export function deactivate() {}
