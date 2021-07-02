// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  ExtensionContext,
  commands,
  Range,
  SnippetString,
  window,
  languages,
} from "vscode";
import { addConsoleLog, MyCodeLensProvider } from "./MyCodeLensProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "lens-flare" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = commands.registerCommand(
    "lens-flare.goToBeginningOfFile",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      window.showInformationMessage("To the top!");
    }
  );

  let dis = commands.registerCommand("lens-flare.addConsoleLog", addConsoleLog);

  context.subscriptions.push(dis);
  context.subscriptions.push(disposable);

  let dd = languages.registerCodeLensProvider(
    {
      language: "javascript",
      scheme: "file",
    },
    new MyCodeLensProvider()
  );

  context.subscriptions.push(dd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
