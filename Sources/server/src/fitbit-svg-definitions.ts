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
    // Base container
    { type: FitbitSvgType.Container, label: "svg", detail: "SVG Container" },

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
    { type: FitbitSvgType.Element, label: "line", detail: "Lines", documentation: "The `<line>` element draws a line between two pairs of coordinates." },
    { type: FitbitSvgType.Attribut, label: "stroke-width", detail: "Thickness", documentation: "The thickness of the line.\n\nMaximum 32" },
    { type: FitbitSvgType.Attribut, label: "stroke-linecap", detail: "End caps of lines", insertText: "stroke-linecap=\"${1|round,butt|}\"", documentation: "`round` or `butt`, defaults to `round`, specifies if the end caps of lines should be rounded or squared." },

    // Rect
    { type: FitbitSvgType.Element, label: "rect", detail: "Rectangles", documentation: "The `<rect>` element allows you to draw rectangles on the screen." },

    // Circle
    { type: FitbitSvgType.Element, label: "circle", detail: "Circle", documentation: "Draw a circle." },
    { type: FitbitSvgType.Attribut, label: "cx", detail: "Center x", documentation: "Coordinate x of the center of the circle" },
    { type: FitbitSvgType.Attribut, label: "cy", detail: "Center y", documentation: "Coordinate y of the center of the circle" },
    { type: FitbitSvgType.Attribut, label: "r", detail: "Radius", documentation: "Radius of the circle." },

    // Image
    { type: FitbitSvgType.Element, label: "Image", detail: "Image", documentation: "You can display images in your application in either PNG or JPEG formats. PNG format is preferable as it is compiled into a hardware accelerated TXI format during compilation. JPEG files are smaller, but take longer to render. Note that Progressive JPEG files are not supported." },
    { type: FitbitSvgType.Attribut, label: "href", detail: "Image href" },

    // Text
    { type: FitbitSvgType.Element, label: "text", detail: "Text", documentation: "A single line of text." },
    { type: FitbitSvgType.Attribut, label: "text-anchor", detail: "Text anchor", insertText: "text-anchor=\"${1|start,middle,end|}\"", documentation: "Can be `start`, `middle`, `end`." },
    { type: FitbitSvgType.Attribut, label: "text-buffer", detail: "Text buffer", documentation: "Holds the text string." },
    { type: FitbitSvgType.Attribut, label: "text-length", detail: "Text length", documentation: "Specifies the number of characters to reserve for the text string. Will be rounded up to a multiple of 4." },
    { type: FitbitSvgType.Attribut, label: "letter-spacing", detail: "Letter spacing", documentation: "Letter spacing in pixels." },
    { type: FitbitSvgType.Attribut, label: "text-overflow", detail: "Text overflow", insertText: "text-overflow=\"${1|clip,ellipsis|}\"", documentation: "Can be `clip` or `ellipsis`." },
    { type: FitbitSvgType.Attribut, label: "font-family", detail: "Font family", insertText: "font-family=\"${1|System-Regular,System-Light,System-Bold|}\"", documentation: "Embedding custom fonts is not supported at this time, but we recommend using a library like `fitfont` to generate images of each character.\n\nSystem Font:\n System-Regular, System-Light, System-Bold" },
    { type: FitbitSvgType.Attribut, label: "font-size", detail: "Font size:", documentation: "Specifies the font size in pixels." },
    { type: FitbitSvgType.Attribut, label: "font-weigh", detail: "Font weigh", insertText: "font-weigh=\"${1|light,regular,bold|}\"", documentation: "specifies the character outline thickness (`light`, `regular`, or `bold`)." },
    { type: FitbitSvgType.Attribut, label: "text-decoration", detail: "Text decoration", insertText: "text-decoration=\"underline\"", documentation: "Specifies the if the text will be underlined or not." },
    { type: FitbitSvgType.Attribut, label: "", detail: "", documentation: "" },

    // Textarea
    { type: FitbitSvgType.Element, label: "textarea", detail: "Text area", documentation: "While `<text>` should be used for a single line of text, the `<textarea>` element displays text over multiple lines." },
    { type: FitbitSvgType.Attribut, label: "display-align", detail: "Display align", insertText: "=\"${1|before,center,after|}\"", documentation: "Specifies the vertical alignment (`before`, `center`, `after`)." },
    { type: FitbitSvgType.Attribut, label: "line-increment", detail: "Line increment", documentation: "Specifies the line, or row height." },
    { type: FitbitSvgType.Attribut, label: "rows", detail: "Rows number", documentation: "Constrains the number of rows." },

    // Arc
    { type: FitbitSvgType.Element, label: "arc", detail: "Arc", documentation: "Draws an arc, circular or elliptical." },
    { type: FitbitSvgType.Attribut, label: "arc-width", detail: "Arc width", documentation: "Arc thickness in pixels, or `%-expression`. Maximum 31." },
    { type: FitbitSvgType.Attribut, label: "start-angle", detail: "Start angle", documentation: "Start angle in degrees, with 0 at 12 o'clock." },
    { type: FitbitSvgType.Attribut, label: "sweep-angle", detail: "Sweep angle", documentation: "Length of the arc in degrees." },

    // Defs
    { type: FitbitSvgType.Container, label: "defs", "detail": "Defs Container", documentation: "`<defs>` is a container element that should be used to include `<symbol>` and stylesheet definitions that will be used by the document.\n\nElements placed inside the `<defs>` container are not rendered." },

    // Section
    { type: FitbitSvgType.Container, label: "section", detail: "Section Container", documentation: "This element is a container that can be used instead of the `<svg>` when only position and size properties of the container are required. It establishes a new coordinate system for the element it contains.\n\nThe `<section>` element has less attributes than `<svg>` and, therefore, consumes less memory." },

    // G container
    { type: FitbitSvgType.Container, label: "g", detail: "G Container", documentation: "The `<g>` container can be used to translate (move), rotate, and/or scale, all of the elements it contains.\n\nThe transformations are applied to the coordinates of its child elements.\n\nThe `<animateTransform>` can be used to animate the `<g>` transformations. It is the only element that supports rotation and the only one that can be a valid parent of `<animateTransform>`." },
    { type: FitbitSvgType.Attribut, label: "transform", detail: "Transform", insertText: "transform=\"${1|translate(50%\\,50%),rotate(45),scale(2)|}\"", documentation: "The `<g>` container can be used to translate (move), rotate, and/or scale, all of the elements it contains.\n\nThe transformations are applied to the coordinates of its child elements.\n\nThe `<animateTransform>` can be used to animate the `<g>` transformations. It is the only element that supports rotation and the only one that can be a valid parent of `<animateTransform>`." },


    /*
        { type: FitbitSvgType.Attribut, label: "", detail: "", documentation: "" },
        { type: FitbitSvgType.Attribut, label: "", detail: "", insertText: "=\"${1|,|}\"", documentation: "" },
        { type: FitbitSvgType.Attribut, label: "", detail: "" },
    */
];