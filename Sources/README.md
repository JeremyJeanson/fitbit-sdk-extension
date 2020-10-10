# Introduction

This extension was built to help developers to use the Fitbit SDK when they use Visual Studio Code.

# Current status

This extension is under active development. Features will be added over time. 

- [x] CSS custom data.
- [ ] CSS Linter (to avoid problems with $).
- [x] SVG files associations.
- [x] SVG coloration.
- [ ] SVG snippets.
- [ ] SVG Language (only SVG components used by the Fitbit SDK, to avoid errors).

It is done on my free time, I haven't planning with dates to do that ;)
Stay tuned!

# vscode-icons users
If you are using the vscode-icons extension, you could change your settings to bind the SVG icon to the Fitbit DSK files.

It could be done by adding this code to your Visual Studio Code settings :

```json
"vsicons.associations.files": [
    {
        "icon": "svg",
        "extensions": [
            "gui",
            "defs",
            "view"
        ],
        "format": "svg"
    }
]
```