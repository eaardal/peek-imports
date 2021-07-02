import * as vscode from "vscode";
import {
  executeVSCodeGoToLocationsCommand,
  executeVSCodePeekLocationsCommand,
} from "./vscodeCommands";

export let currentSelection: vscode.Selection;
export let currentEditor: vscode.TextEditor;
export let currentVisibleRanges: Array<vscode.Range>;

async function getImportStatementsRange(editor: vscode.TextEditor) {
  const text = editor.document.getText();
  const lines = text.split("\n");

  let importLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("import")) {
      importLines.push(i);
    }
  }

  const startLineNumber = importLines[0] + 1;
  const endLineNumber = importLines[importLines.length - 1] + 1;

  let startLocation = new vscode.Location(
    editor.document.uri,
    new vscode.Position(startLineNumber, 0)
  );

  let endLocation = new vscode.Location(
    editor.document.uri,
    new vscode.Position(endLineNumber, 0)
  );

  return {
    start: startLocation,
    end: endLocation,
  };
}

async function handlePeekWindowClosing(subscription: vscode.Disposable) {
  // When the peek window closes we want to go to the previous cursor location.
  // The currentSelection holds the position before we opened the peek window.
  await executeVSCodeGoToLocationsCommand(
    currentEditor.document.uri,
    new vscode.Position(
      currentSelection.start.line,
      currentSelection.start.character
    ),
    [currentSelection.start, currentSelection.end]
  );

  // TODO: Ideally we want to reset the editor's scroll position so that both the cursor
  // and the screen position are reset to exactly how it was before we opened the peek window.
  // So far I haven't been able to find the correct way of achieving this.

  // Stop listening for onDidChangeVisibleTextEditors events.
  // If the peekImports command is used again, we'll start a new subscription for that peek window.
  subscription.dispose();
}

function isSameEditor(a: vscode.TextEditor, b: vscode.TextEditor): boolean {
  return a.document.fileName === b.document.fileName;
}

function detectPeekWindowClosing() {
  // Couldn't find any event dedicated to the peek window closing so we have to check for text editor visibility
  // to try to use that to figure out when the peek window was closed.
  //
  // The logic is that if we subscribe to the onDidChangeVisibleTextEditors event after we successfully opened the peek window,
  // then the next time onDidChangeVisibleTextEditors fires should be when the peek window closes and the text editor receives focus again.

  let subscription = vscode.window.onDidChangeVisibleTextEditors(
    async (editors) => {
      for (let editor of editors) {
        if (isSameEditor(editor, currentEditor)) {
          await handlePeekWindowClosing(subscription);
        }
      }
    }
  );
}

export async function peekImports() {
  console.log("peekImports start");

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    console.error(`failed to get active editor`);
    return;
  }

  // Save some of our current state before we open the peek window.
  // We'll use these to reset the user's cursor and screen position after the peek window closes.

  currentEditor = editor;
  currentSelection = editor.selection;
  currentVisibleRanges = editor.visibleRanges;

  // Figure out at which lines the import statements starts and ends
  const { start, end } = await getImportStatementsRange(editor);

  // Open a peek window at the import statements line range
  await executeVSCodePeekLocationsCommand(
    editor.document.uri,
    editor.selection.active,
    [start, end]
  );

  // After we have opened a peek window, we need to hook up to some event listeners
  // to figure out when the peek window closes so we can do some cleanup.
  detectPeekWindowClosing();

  console.log("peekImports end");
}
