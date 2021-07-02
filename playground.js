"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const MyCodeLensProvider_1 = require("./MyCodeLensProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "lens-flare" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode_1.commands.registerCommand("lens-flare.goToBeginningOfFile", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode_1.window.showInformationMessage("To the top!");
    });
    let dis = vscode_1.commands.registerCommand("lens-flare.addConsoleLog", MyCodeLensProvider_1.addConsoleLog);
    context.subscriptions.push(dis);
    context.subscriptions.push(disposable);
    let dd = vscode_1.languages.registerCodeLensProvider({
        language: "javascript",
        scheme: "file",
    }, new MyCodeLensProvider_1.MyCodeLensProvider());
    context.subscriptions.push(dd);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=playground.js.map