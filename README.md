# Fitbit SDK Extension for vscode

[![Fitbit SDK Extension for vscode](Sources/images/icon.png)](https://marketplace.visualstudio.com/items?itemName=JeremyJeanson.fitbit-sdk-extension)

This extension was built to help developers to use the Fitbit SDK when they use Visual Studio Code.

It coudl be installed form [the marketplace](https://marketplace.visualstudio.com/items?itemName=JeremyJeanson.fitbit-sdk-extension).


# Current status

This extension is under active development. Features will be added over time. 

- [x] CSS custom data.
- [ ] CSS Linter (to avoid problems with `$`).
- [x] SVG files associations.
- [x] SVG coloration.
- [x] SVG snippets.
    - [x] Basic controls.
    - [x] Buttons.
    - [x] Texts.
    - [x] Views.
    - [x] Other.
    - [x] Animations.
- [ ] SVG Language.
    - [x] Completion (All SVG elements and attributs used by the Fitbit SDK, to avoid errors).
    - [x] Documentation when mouse is hover elements.
    - [x] Format.
    - [x] Colors (display and edit).
    - [ ] Validation.

# Exemples

Code completion.
![Make the edition of SVG easier](Assets/demos/code-completion.gif)

View and edit colors.
![Colors edition](Assets/demos/colors.gif)

Snippets to define symbols and animations.
![An easy way create a custom components](Assets/demos/symbols.gif)

Snippets to use Fitbit SDK components.
![An easy way to use fitbit components components](Assets/demos/components.gif)

Snippets to include link to the Fitbit SDK definitions.
![An easy way create add link to Fitbit definion files](Assets/demos/defs.gif)

Display documentation when mouse is hover elements.
![Documentation](Assets/demos/documentation.png)

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

# Contribute or report issues
You can report any issue via GitHu. If you found one, please report it! This code was open to be shared and improved. If you have an idea, tell it or send a pull request. 