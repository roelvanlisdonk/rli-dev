Keyboard shortcuts I use:

```
[
  // Add a new file to the currently selected folder in the explorer
  { "key": "ctrl+n", "command": "explorer.newFile" },
  { "key": "ctrl+s", "command": "workbench.action.files.saveAll" },
  { "key": "ctrl+shift+s", "command": "git.sync" },
  { "key": "ctrl+shift+u", "command": "editor.action.transformToUppercase" },
  { "key": "ctrl+shift+l", "command": "editor.action.transformToLowercase" },
  {
    "key": "F8",
    "command": "workbench.action.terminal.runSelectedText",
    "when": "editorTextFocus && editorLangId == 'shellscript'"
  },
  {
    "key": "ctrl+f8",
    "command": "editor.action.marker.nextInFiles",
    "when": "editorFocus && !editorReadonly"
  },
  {
    "key": "f8",
    "command": "-editor.action.marker.nextInFiles",
    "when": "editorFocus && !editorReadonly"
  }
]
```
