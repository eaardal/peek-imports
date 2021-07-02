import * as vscode from "vscode";

export async function executeVSCodeGoToLocationsCommand(
  uri: vscode.Uri,
  position: vscode.Position,
  locations: Array<vscode.Position>
) {
  await vscode.commands
    .executeCommand(
      "editor.action.goToLocations",
      uri,
      position,
      locations,
      "goto",
      "executeVSCodeGoToLocationsCommand: No locations to go to"
    )
    .then(
      () => {
        console.log("resetting location resolved successfully");
      },
      (err) => {
        console.error("resetting location rejected with error", err);
      }
    );
}

export async function executeVSCodePeekLocationsCommand(
  uri: vscode.Uri,
  position: vscode.Position,
  locations: Array<vscode.Location>
) {
  await vscode.commands
    .executeCommand(
      "editor.action.peekLocations",
      uri,
      position,
      locations,
      "peek"
    )
    .then(
      () => {
        console.log("editor.action.peekLocations resolved successfully");
      },
      (err) => {
        console.error("editor.action.peekLocations rejected with error", err);
      }
    );
}
