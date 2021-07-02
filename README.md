# Peeky

A Visual Studio Code extension that lets you peek and modify import statements without leaving the line you're working on.

## How to use

Anywhere in a code file, use the command `Peeky: Peek Imports`.

A Peek Window will open at your current position, but it will contain the import statements at the top of the file.
Insert a new import statement or modify an existing one, then press <key>Escape</key> to discard the Peek Window and continue writing code where you left of.

## Options

By default when the Peek Window opens, the right-hand side menu is in focus. This is annoying because you then have to move your hand over to your mouse to set the cursor where you want to insert a new import statement in the left-hand editor panel.
To change it so that the left-hand editor panel is in focus by default, go to `Preferences: Open User Settings` and under `Text Editor` change the setting `Peek Widget Default Focus` to be `editor`.

![](./docs/images/howToChangePeekWindowFocus.png)
