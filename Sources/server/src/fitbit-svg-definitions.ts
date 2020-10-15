export namespace FitbitSvgType {
    export const Container = 1;
    export const Element = 2;
    export const Attribut = 3;
}
export declare type FitbitSvgType = 1 | 2 | 3;

export interface IFitbitDefinition {
    type: FitbitSvgType;
    label: string;
    insertText?: string;
    detail: string;
    documentation?: string;
}

export const fitbitDefinitions: IFitbitDefinition[] = [
    // Containers
    { type: FitbitSvgType.Container, label: "svg", detail: "SVG Container" },
    { type: FitbitSvgType.Container, label: "section", detail: "Section Container", documentation: "This element is a container that can be used instead of the `<svg>` when only position and size properties of the container are required. It establishes a new coordinate system for the element it contains.\n\nThe `<section>` element has less attributes than `<svg>` and, therefore, consumes less memory." },
    { type: FitbitSvgType.Container, label: "g", detail: "G Container", documentation: "The `<g>` container can be used to translate (move), rotate, and/or scale, all of the elements it contains.\n\nThe transformations are applied to the coordinates of its child elements.\n\nThe `<animateTransform>` can be used to animate the `<g>` transformations. It is the only element that supports rotation and the only one that can be a valid parent of `<animateTransform>`." },
    { type: FitbitSvgType.Container, label: "defs", "detail": "Defs Container", documentation: "`<defs>` is a container element that should be used to include `<symbol>` and stylesheet definitions that will be used by the document.\n\nElements placed inside the `<defs>` container are not rendered." },

    // Simple elements
    { type: FitbitSvgType.Element, label: "line", detail: "Lines", documentation: "The `<line>` element draws a line between two pairs of coordinates." },
    { type: FitbitSvgType.Element, label: "rect", detail: "Rectangles", documentation: "The `<rect>` element allows you to draw rectangles on the screen." },

    // Base attributs
    { type: FitbitSvgType.Attribut, label: "id", detail: "Id" },
    { type: FitbitSvgType.Attribut, label: "x", detail: "x coordinate" },
    { type: FitbitSvgType.Attribut, label: "y", detail: "y coordinate" },
    { type: FitbitSvgType.Attribut, label: "height", detail: "Height" },
    { type: FitbitSvgType.Attribut, label: "widht", detail: "Width" },

    // Common attributs
    { type: FitbitSvgType.Attribut, label: "fill", detail: "Fill color" },
    { type: FitbitSvgType.Attribut, label: "opacity", detail: "Opacity", documentation: "Specifies the opacity of the element (between 0 and 1)." },
    { type: FitbitSvgType.Attribut, label: "visibility", detail: "Visibility", insertText: "visibility=\"${1|visible,hidden|}\"", documentation: "Specifies if the line should be `visible` or `hidden`." },
    { type: FitbitSvgType.Attribut, label: "display", detail: "Display", insertText: "display=\"${1|none,inline,inherit|}\"", documentation: "none, inline or inherit." },

    //Line
    { type: FitbitSvgType.Attribut, label: "stroke-width", detail: "Thickness", documentation: "The thickness of the line.\n\nMaximum 32" },
    { type: FitbitSvgType.Attribut, label: "stroke-linecap", detail: "End caps of lines", insertText: "stroke-linecap=\"${1|round,butt|}\"", documentation: "`round` or `butt`, defaults to `round`, specifies if the end caps of lines should be rounded or squared." },

    /*
        { type: FitbitSvgType.Attribut, label: "", detail: "", documentation: "" },
        { type: FitbitSvgType.Attribut, label: "", detail: "", insertText: "=\"${1|,|}\"", documentation: "" },
        { type: FitbitSvgType.Attribut, label: "", detail: "" },
    */
];