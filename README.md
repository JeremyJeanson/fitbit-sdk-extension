# Introduction

This extension was built to help developers to use the Fitbit SDK when they use Visual Studio Code.

# Current status

This extension is under active development. Features will be added over time. 

- [x] CSS custom data.
- [ ] CSS Linter (to avoid problems with $).
- [x] SVG files associations.
- [x] SVG coloration.
- [x] SVG snippets.
    - [x] Basic controls.
    - [x] Buttons.
    - [x] Texts.
    - [x] Views.
    - [x] Other.
    - [x] Animations.
- [ ] SVG Language (only SVG components used by the Fitbit SDK, to avoid errors).

# Exemples

Snippets to define symbols and animations.
![An easy way create a custom components](Assets/demos/symbols.gif)

Snippets to use Fitbit SDK components.
![An easy way to use fitbit components components](Assets/demos/components.gif)

Snippets to include link to the Fitbit SDK definitions.
![An easy way create add link to Fitbit definion files](Assets/demos/defs.gif)

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