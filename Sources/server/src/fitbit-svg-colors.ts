import { ColorInformation, ColorPresentationParams, ColorPresentation, Color, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

interface IColor {
    name: string;
    // red: number;
    // green: number;
    // blue: number;
    value: Color;
}

/**
 * Colors available
 */
const colors: IColor[] = [
    // Documentation : https://dev.fitbit.com/build/guides/user-interface/css/
    // Web Color Names
    { name: "aliceblue", value: colorFromRGB6("#F0F8FF") },
    { name: "antiquewhite", value: colorFromRGB6("#FAEBD7") },
    { name: "aqua", value: colorFromRGB6("#00FFFF") },
    { name: "aquamarine", value: colorFromRGB6("#7FFFD4") },
    { name: "azure", value: colorFromRGB6("#F0FFFF") },
    { name: "beige", value: colorFromRGB6("#F5F5DC") },
    { name: "bisque", value: colorFromRGB6("#FFE4C4") },
    { name: "black", value: colorFromRGB6("#000000") },
    { name: "blanchedalmond", value: colorFromRGB6("#FFEBCD") },
    { name: "blue", value: colorFromRGB6("#0000FF") },
    { name: "blueviolet", value: colorFromRGB6("#8A2BE2") },
    { name: "brown", value: colorFromRGB6("#A52A2A") },
    { name: "burlywood", value: colorFromRGB6("#DEB887") },
    { name: "cadetblue", value: colorFromRGB6("#5F9EA0") },
    { name: "chartreuse", value: colorFromRGB6("#7FFF00") },
    { name: "chocolate", value: colorFromRGB6("#D2691E") },
    { name: "coral", value: colorFromRGB6("#FF7F50") },
    { name: "cornflowerblue", value: colorFromRGB6("#6495ED") },
    { name: "cornsilk", value: colorFromRGB6("#FFF8DC") },
    { name: "crimson", value: colorFromRGB6("#DC143C") },
    { name: "cyan", value: colorFromRGB6("#00FFFF") },
    { name: "darkblue", value: colorFromRGB6("#00008B") },
    { name: "darkcyan", value: colorFromRGB6("#008B8B") },
    { name: "darkgoldenrod", value: colorFromRGB6("#B8860B") },
    { name: "darkgray", value: colorFromRGB6("#A9A9A9") },
    { name: "darkgreen", value: colorFromRGB6("#006400") },
    { name: "darkgrey", value: colorFromRGB6("#A9A9A9") },
    { name: "darkkhaki", value: colorFromRGB6("#BDB76B") },
    { name: "darkmagenta", value: colorFromRGB6("#8B008B") },
    { name: "darkolivegreen", value: colorFromRGB6("#556B2F") },
    { name: "darkorange", value: colorFromRGB6("#FF8C00") },
    { name: "darkorchid", value: colorFromRGB6("#9932CC") },
    { name: "darkred", value: colorFromRGB6("#8B0000") },
    { name: "darksalmon", value: colorFromRGB6("#E9967A") },
    { name: "darkseagreen", value: colorFromRGB6("#8FBC8F") },
    { name: "darkslateblue", value: colorFromRGB6("#483D8B") },
    { name: "darkslategray", value: colorFromRGB6("#2F4F4F") },
    { name: "darkslategrey", value: colorFromRGB6("#2F4F4F") },
    { name: "darkturquoise", value: colorFromRGB6("#00CED1") },
    { name: "darkviolet", value: colorFromRGB6("#9400D3") },
    { name: "deeppink", value: colorFromRGB6("#FF1493") },
    { name: "deepskyblue", value: colorFromRGB6("#00BFFF") },
    { name: "dimgray", value: colorFromRGB6("#696969") },
    { name: "dimgrey", value: colorFromRGB6("#696969") },
    { name: "dodgerblue", value: colorFromRGB6("#1E90FF") },
    { name: "firebrick", value: colorFromRGB6("#B22222") },
    { name: "floralwhite", value: colorFromRGB6("#FFFAF0") },
    { name: "forestgreen", value: colorFromRGB6("#228B22") },
    { name: "fuchsia", value: colorFromRGB6("#FF00FF") },
    { name: "gainsboro", value: colorFromRGB6("#DCDCDC") },
    { name: "ghostwhite", value: colorFromRGB6("#F8F8FF") },
    { name: "gold", value: colorFromRGB6("#FFD700") },
    { name: "goldenrod", value: colorFromRGB6("#DAA520") },
    { name: "gray", value: colorFromRGB6("#808080") },
    { name: "green", value: colorFromRGB6("#008000") },
    { name: "greenyellow", value: colorFromRGB6("#ADFF2F") },
    { name: "grey", value: colorFromRGB6("#808080") },
    { name: "honeydew", value: colorFromRGB6("#F0FFF0") },
    { name: "hotpink", value: colorFromRGB6("#FF69B4") },
    { name: "indianred", value: colorFromRGB6("#CD5C5C") },
    { name: "indigo", value: colorFromRGB6("#4B0082") },
    { name: "ivory", value: colorFromRGB6("#FFFFF0") },
    { name: "khaki", value: colorFromRGB6("#F0E68C") },
    { name: "lavender", value: colorFromRGB6("#E6E6FA") },
    { name: "lavenderblush", value: colorFromRGB6("#FFF0F5") },
    { name: "lawngreen", value: colorFromRGB6("#7CFC00") },
    { name: "lemonchiffon", value: colorFromRGB6("#FFFACD") },
    { name: "lightblue", value: colorFromRGB6("#ADD8E6") },
    { name: "lightcoral", value: colorFromRGB6("#F08080") },
    { name: "lightcyan", value: colorFromRGB6("#E0FFFF") },
    { name: "lightgoldenrodyellow", value: colorFromRGB6("#FAFAD2") },
    { name: "lightgray", value: colorFromRGB6("#D3D3D3") },
    { name: "lightgreen", value: colorFromRGB6("#90EE90") },
    { name: "lightgrey", value: colorFromRGB6("#D3D3D3") },
    { name: "lightpink", value: colorFromRGB6("#FFB6C1") },
    { name: "lightsalmon", value: colorFromRGB6("#FFA07A") },
    { name: "lightseagreen", value: colorFromRGB6("#20B2AA") },
    { name: "lightskyblue", value: colorFromRGB6("#87CEFA") },
    { name: "lightslategray", value: colorFromRGB6("#778899") },
    { name: "lightslategrey", value: colorFromRGB6("#778899") },
    { name: "lightsteelblue", value: colorFromRGB6("#B0C4DE") },
    { name: "lightyellow", value: colorFromRGB6("#FFFFE0") },
    { name: "lime", value: colorFromRGB6("#00FF00") },
    { name: "limegreen", value: colorFromRGB6("#32CD32") },
    { name: "linen", value: colorFromRGB6("#FAF0E6") },
    { name: "magenta", value: colorFromRGB6("#FF00FF") },
    { name: "maroon", value: colorFromRGB6("#800000") },
    { name: "mediumaquamarine", value: colorFromRGB6("#66CDAA") },
    { name: "mediumblue", value: colorFromRGB6("#0000CD") },
    { name: "mediumorchid", value: colorFromRGB6("#BA55D3") },
    { name: "mediumpurple", value: colorFromRGB6("#9370DB") },
    { name: "mediumseagreen", value: colorFromRGB6("#3CB371") },
    { name: "mediumslateblue", value: colorFromRGB6("#7B68EE") },
    { name: "mediumspringgreen", value: colorFromRGB6("#00FA9A") },
    { name: "mediumturquoise", value: colorFromRGB6("#48D1CC") },
    { name: "mediumvioletred", value: colorFromRGB6("#C71585") },
    { name: "midnightblue", value: colorFromRGB6("#191970") },
    { name: "mintcream", value: colorFromRGB6("#F5FFFA") },
    { name: "mistyrose", value: colorFromRGB6("#FFE4E1") },
    { name: "moccasin", value: colorFromRGB6("#FFE4B5") },
    { name: "navajowhite", value: colorFromRGB6("#FFDEAD") },
    { name: "navy", value: colorFromRGB6("#000080") },
    { name: "oldlace", value: colorFromRGB6("#FDF5E6") },
    { name: "olive", value: colorFromRGB6("#808000") },
    { name: "olivedrab", value: colorFromRGB6("#6B8E23") },
    { name: "orange", value: colorFromRGB6("#FFA500") },
    { name: "orangered", value: colorFromRGB6("#FF4500") },
    { name: "orchid", value: colorFromRGB6("#DA70D6") },
    { name: "palegoldenrod", value: colorFromRGB6("#EEE8AA") },
    { name: "palegreen", value: colorFromRGB6("#98FB98") },
    { name: "paleturquoise", value: colorFromRGB6("#AFEEEE") },
    { name: "palevioletred", value: colorFromRGB6("#DB7093") },
    { name: "papayawhip", value: colorFromRGB6("#FFEFD5") },
    { name: "peachpuff", value: colorFromRGB6("#FFDAB9") },
    { name: "peru", value: colorFromRGB6("#CD853F") },
    { name: "pink", value: colorFromRGB6("#FFC0CB") },
    { name: "plum", value: colorFromRGB6("#DDA0DD") },
    { name: "powderblue", value: colorFromRGB6("#B0E0E6") },
    { name: "purple", value: colorFromRGB6("#800080") },
    { name: "red", value: colorFromRGB6("#FF0000") },
    { name: "rosybrown", value: colorFromRGB6("#BC8F8F") },
    { name: "royalblue", value: colorFromRGB6("#4169E1") },
    { name: "saddlebrown", value: colorFromRGB6("#8B4513") },
    { name: "salmon", value: colorFromRGB6("#FA8072") },
    { name: "sandybrown", value: colorFromRGB6("#F4A460") },
    { name: "seagreen", value: colorFromRGB6("#2E8B57") },
    { name: "seashell", value: colorFromRGB6("#FFF5EE") },
    { name: "sienna", value: colorFromRGB6("#A0522D") },
    { name: "silver", value: colorFromRGB6("#C0C0C0") },
    { name: "skyblue", value: colorFromRGB6("#87CEEB") },
    { name: "slateblue", value: colorFromRGB6("#6A5ACD") },
    { name: "slategray", value: colorFromRGB6("#708090") },
    { name: "slategrey", value: colorFromRGB6("#708090") },
    { name: "snow", value: colorFromRGB6("#FFFAFA") },
    { name: "springgreen", value: colorFromRGB6("#00FF7F") },
    { name: "steelblue", value: colorFromRGB6("#4682B4") },
    { name: "tan", value: colorFromRGB6("#D2B48C") },
    { name: "teal", value: colorFromRGB6("#008080") },
    { name: "thistle", value: colorFromRGB6("#D8BFD8") },
    { name: "tomato", value: colorFromRGB6("#FF6347") },
    { name: "turquoise", value: colorFromRGB6("#40E0D0") },
    { name: "violet", value: colorFromRGB6("#EE82EE") },
    { name: "wheat", value: colorFromRGB6("#F5DEB3") },
    { name: "white", value: colorFromRGB6("#FFFFFF") },
    { name: "whitesmoke", value: colorFromRGB6("#F5F5F5") },
    { name: "yellow", value: colorFromRGB6("#FFFF00") },
    { name: "yellowgreen", value: colorFromRGB6("#9ACD32") },
    // Fitbit Named Colors
    { name: "fb-aqua", value: colorFromRGB6("#3BF7DE") },
    { name: "fb-black", value: colorFromRGB6("#000000") },
    { name: "fb-blue", value: colorFromRGB6("#4D86FF") },
    { name: "fb-cerulean", value: colorFromRGB6("#8080FF") },
    { name: "fb-cyan", value: colorFromRGB6("#15B9ED") },
    { name: "fb-dark-gray", value: colorFromRGB6("#505050") },
    { name: "fb-extra-dark-gray", value: colorFromRGB6("#303030") },
    { name: "fb-green", value: colorFromRGB6("#2CB574") },
    { name: "fb-green-press", value: colorFromRGB6("#134022") },
    { name: "fb-indigo", value: colorFromRGB6("#5B4CFF") },
    { name: "fb-lavender", value: colorFromRGB6("#8173FF") },
    { name: "fb-light-gray", value: colorFromRGB6("#A0A0A0") },
    { name: "fb-lime", value: colorFromRGB6("#72B314") },
    { name: "fb-magenta", value: colorFromRGB6("#F1247C") },
    { name: "fb-mint", value: colorFromRGB6("#5BE37D") },
    { name: "fb-orange", value: colorFromRGB6("#FF752D") },
    { name: "fb-peach", value: colorFromRGB6("#FFCC33") },
    { name: "fb-pink", value: colorFromRGB6("#FF78B7") },
    { name: "fb-plum", value: colorFromRGB6("#A51E7C") },
    { name: "fb-purple", value: colorFromRGB6("#C658FB") },
    { name: "fb-red", value: colorFromRGB6("#FA4D61") },
    { name: "fb-slate", value: colorFromRGB6("#7090B5") },
    { name: "fb-slate-press", value: colorFromRGB6("#1B2C40") },
    { name: "fb-violet", value: colorFromRGB6("#D828B8") },
    { name: "fb-white", value: colorFromRGB6("#FFFFFF") },
    { name: "fb-yellow", value: colorFromRGB6("#F0A500") },
    { name: "fb-yellow-press", value: colorFromRGB6("#394003") }
];

/**
 * Add colors to the document
 * @param docuement 
 */
export function onDocumentColor(docuement: TextDocument): ColorInformation[] {
    // Search all fill attributs
    const text = docuement.getText();
    const pattern = /(?<attribut>fill)=["'](?<color>[#a-zA-Z0-9]*)["']/gm;
    const result: ColorInformation[] = [];
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (match.index === pattern.lastIndex) {
            pattern.lastIndex++;
        }
        // Check groups
        if (match.groups) {
            // Use the match
            // Get the color name / or value set by the user
            const colorName = match.groups["color"];
            // Try to get the color
            const color = colorFromString(colorName);
            if (color) {
                // Set the color to display on the attribut
                const start = match.index + match.groups["attribut"].length + 2;
                const range = Range.create(
                    docuement.positionAt(start),
                    docuement.positionAt(start + colorName.length));
                result.push(ColorInformation.create(range, color));
            }
        }
    }
    return result;
}

/**
 * Convert a value as string to the color to show
 * @param value 
 */
function colorFromString(value: string): Color | undefined {
    if (value.length <= 0) { return undefined; }

    // Try to find the color by name
    const color = colors.find(c => c.name === value.toLowerCase());
    if (color) { return color.value; }

    // Try to detect format
    if (/^#[a-fA-F0-9]{6}$/.test(value)) { return colorFromRGB6(value); }
    if (/^#[a-fA-F0-9]{3}$/.test(value)) { return colorFromRGB3(value); }

    return undefined;
}

/**
 * Create color from RVG value like #FFFFFF
 * @param value 
 */
function colorFromRGB6(value: string): Color {
    const red = Number.parseInt(value.substr(1, 2), 16) / 255;
    const green = Number.parseInt(value.substr(3, 2), 16) / 255;
    const blue = Number.parseInt(value.substr(5, 2), 16) / 255;
    return Color.create(red, green, blue, 1);
}

/**
 * Create color from RVG value like #FFF
 * @param value 
 */
function colorFromRGB3(value: string): Color {
    const red = Number.parseInt(value.substr(1, 1), 16) * 17 / 255;
    const green = Number.parseInt(value.substr(2, 1), 16) * 17 / 255;
    const blue = Number.parseInt(value.substr(3, 1), 16) * 17 / 255;
    return Color.create(red, green, blue, 1);
}

/**
 * User edited a color -> return the fitbit color or the hexa value
 * @param color 
 */
export function onColorPresentation(color: Color): ColorPresentation[] {
    // Try to get the fitbit color
    const fitbitColor = colors.find(c =>
        c.value.red === color.red
        && c.value.green === color.green
        && c.value.blue === color.blue);
    if (fitbitColor) { return [ColorPresentation.create(fitbitColor.name)]; }

    return [ColorPresentation.create(
        `#${number2HexadecimalString(color.red)}${number2HexadecimalString(color.green)}${number2HexadecimalString(color.blue)}`
    )];
}

/**
 * Convert a number to an hexa string like FF
 * @param value 
 */
function number2HexadecimalString(value: number): string {
    const result = (value * 255).toString(16);
    return result.length > 1
        ? result
        : "0" + result;
}