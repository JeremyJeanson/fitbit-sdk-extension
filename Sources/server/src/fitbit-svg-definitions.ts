import { type } from "os";

/**
 * Bas of all definitions
 */
export interface IFitbitDefinition {
    label: string;
    insertText?: string;
    detail: string;
    documentation: string;
}

export namespace FitbitAttributFamily {
    export const Id = 0;
    export const Box = 1;
    export const Visual = 2;
    export const Line = 3;
    export const Circle = 4;
    export const Href = 5;
    export const Text = 6;
    export const TextArea = 7;
    export const Arc = 8;
    export const Transform = 9;
    export const Gradient = 10;
    export const Set = 11;
    export const Link = 12;
    export const Animation = 13;
    export const TransformationAnimation = 14;
}
export type FitbitAttributFamily = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

/**
 * Define an Element 
 */
export interface IFitbitElementDefinition extends IFitbitDefinition {
    container?: boolean;
    attributs: FitbitAttributFamily[]
}

/**
 * Define an Attribut
 */
export interface IFitbitAttributDefinition extends IFitbitDefinition {
    type: FitbitAttributFamily;
}

/**
 * Define the definition container
 */
export interface FitbitDefinitions {
    elements: IFitbitElementDefinition[];
    attributs: IFitbitAttributDefinition[];
}

/**
 * Contain the definnition off all fitbit element use in SVG files
 */
export const fitbitDefinitions: FitbitDefinitions = {
    elements: [
        // Base
        {
            label: "svg", detail: "SVG Container", documentation: "This element is a container for all elements.",
            container: true, attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box,]
        },

        // Line
        {
            label: "line", detail: "Lines", documentation: "The `<line>` element draws a line between two pairs of coordinates.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Line]
        },

        // Rectangles
        {
            label: "rect", detail: "Rectangles", documentation: "The `<rect>` element allows you to draw rectangles on the screen.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box]
        },

        // Circles
        {
            label: "circle", detail: "Circle", documentation: "Draw a circle.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box, FitbitAttributFamily.Circle]
        },

        // Image
        {
            label: "image", detail: "Image", documentation: "You can display images in your application in either PNG or JPEG formats. PNG format is preferable as it is compiled into a hardware accelerated TXI format during compilation. JPEG files are smaller, but take longer to render. Note that Progressive JPEG files are not supported.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box, FitbitAttributFamily.Href]
        },

        // Text
        {
            label: "text", detail: "Text", documentation: "A single line of text.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box, FitbitAttributFamily.Text]
        },

        // Textarea
        {
            label: "textarea", detail: "Text area", documentation: "While `<text>` should be used for a single line of text, the `<textarea>` element displays text over multiple lines.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box, FitbitAttributFamily.Text, FitbitAttributFamily.TextArea]
        },

        // Arc
        {
            label: "arc", detail: "Arc", documentation: "Draws an arc, circular or elliptical.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box, FitbitAttributFamily.Arc]
        },

        // Defs
        {
            label: "defs", "detail": "Defs Container", documentation: "`<defs>` is a container element that should be used to include `<symbol>` and stylesheet definitions that will be used by the document.\n\nElements placed inside the `<defs>` container are not rendered.",
            container: true, attributs: []
        },

        // Section
        {
            label: "section", detail: "Section Container", documentation: "This element is a container that can be used instead of the `<svg>` when only position and size properties of the container are required. It establishes a new coordinate system for the element it contains.\n\nThe `<section>` element has less attributes than `<svg>` and, therefore, consumes less memory.",
            container: true, attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Box]
        },

        // G container
        {
            label: "g", detail: "G Container", documentation: "The `<g>` container can be used to translate (move), rotate, and/or scale, all of the elements it contains.\n\nThe transformations are applied to the coordinates of its child elements.\n\nThe `<animateTransform>` can be used to animate the `<g>` transformations. It is the only element that supports rotation and the only one that can be a valid parent of `<animateTransform>`.",
            container: true, attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Transform]
        },

        // Gradient Rectangle
        {
            label: "gradientRect", detail: "Gradient rectangle", documentation: "The `<gradientRect>` element fills a rectangle with a color texture, without the use of a bitmap. It can blend two colors when the gradient type is `linear` or `radial`, or four colors when the type is bilinear.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box, FitbitAttributFamily.Gradient]
        },

        // gradientArc
        {
            label: "gradientArc", detail: "Gradient arc", documentation: "The `<gradientArc>` element fills an arc with a color texture, without the use of a bitmap. It can blend two colors when the gradient type is `linear` or `radial`, or four colors when the type is bilinear.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box, FitbitAttributFamily.Gradient]
        },

        // Mask
        {
            label: "mask", detail: "Mask", insertText: " id=\"${1}\"", documentation: "<mask> is a container element that creates a mask which can be used by `<svg>` elements for visual effects. It can contain any graphical elements or container elements such as <g>.\n\nThe `<svg>` element that uses the mask element will be painted through the mask. Only the overlapping areas will remain.",
            container: true, attributs: [FitbitAttributFamily.Id]
        },

        // Template Symbols
        {
            label: "symbol", detail: "Template symbol", insertText: "id=\"${1}\"", documentation: "By defining an element as a `<symbol>`, developers can reuse that same element multiple times without having to duplicate the same markup. The `<set>` element can be used to modify attributes of each instance of the `<symbol>`.",
            container: true, attributs: [FitbitAttributFamily.Id]
        },
        {
            label: "use", detail: "Use a symbol", insertText: "href=\"#${1}\"", documentation: "Allow to use a `<symbol>`.",
            container: true, attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Visual, FitbitAttributFamily.Box, FitbitAttributFamily.Href]
        },
        {
            label: "set", detail: "Set a symbol element attribut", insertText: "href=\"${1}\" attributeName=\"${2|x,y,height,width,href,text-buffer,fill,opacity,cx,cy,r|}\" to=\"${3}\"", documentation: "The `<set>` element can be used to modify attributes of each instance of the `<symbol>`.",
            attributs: [FitbitAttributFamily.Id, FitbitAttributFamily.Set]
        },

        // Link
        {
            label: "link", detail: "Link file", documentation: "Add a link to a file to use.",
            attributs: [FitbitAttributFamily.Link, FitbitAttributFamily.Href]
        },

        // Animations
        {
            label: "animate", detail: "Animate an element", documentation: "Property animations allow the simple manipulation of an element's attributes. For example, changing the opacity, or the coordinates of an element.\n\nTo create a property animation, the `<animate>` element should be added as a child of the element you want to animate.",
            attributs: [FitbitAttributFamily.Animation]
        },

        // Transformation Animations
        {
            label: "animateTransform", detail: "Transformation animation", documentation: "Transformation animations allow an element to be easily translated (moved), scaled and rotated.\n\nThe `<animateTransform>` element must be added as a child of a `<g>` element, alongside the elements you want to manipulate.",
            attributs: [FitbitAttributFamily.Animation, FitbitAttributFamily.TransformationAnimation]
        },

    ],
    attributs: [
        // common to all
        { type: FitbitAttributFamily.Id, label: "id", detail: "Id", documentation: "Id to get the element from JavasScript or TypeScript via document.getElementById()." },

        // Box
        { type: FitbitAttributFamily.Box, label: "x", detail: "x coordinate", documentation: "Horizontal position of the element." },
        { type: FitbitAttributFamily.Box, label: "y", detail: "y coordinate", documentation: "Vertisal position of the element." },
        { type: FitbitAttributFamily.Box, label: "height", detail: "Height", documentation: "Height of the element." },
        { type: FitbitAttributFamily.Box, label: "width", detail: "Width", documentation: "Width of the element" },

        // Visual
        { type: FitbitAttributFamily.Visual, label: "class", detail: "CSS", documentation: "Classes to apply to the element." },
        { type: FitbitAttributFamily.Visual, label: "fill", detail: "Fill color", documentation: "Color to fill the element or inner elements." },
        { type: FitbitAttributFamily.Visual, label: "viewport-fill", detail: "Viewport fill color", documentation: "Color to fill the element or inner elements." },
        { type: FitbitAttributFamily.Visual, label: "opacity", detail: "Opacity", documentation: "Specifies the opacity of the element (between 0 and 1)." },
        { type: FitbitAttributFamily.Visual, label: "visibility", detail: "Visibility", insertText: "visibility=\"${1|visible,hidden|}\"", documentation: "Specifies if the line should be `visible` or `hidden`." },
        { type: FitbitAttributFamily.Visual, label: "display", detail: "Display", insertText: "display=\"${1|none,inline,inherit|}\"", documentation: "none, inline or inherit." },
        { type: FitbitAttributFamily.Visual, label: "pointer-events", detail: "Pointer events", insertText: "pointer-events=\"visible\"", documentation: "Enable touch events to the element.\n\n You can attach a handler to the `mouseup`, `mousedown` and `mousemove` events." },

        //Line
        { type: FitbitAttributFamily.Line, label: "stroke-width", detail: "Thickness", documentation: "The thickness of the line.\n\nMaximum 32" },
        { type: FitbitAttributFamily.Line, label: "stroke-linecap", detail: "End caps of lines", insertText: "stroke-linecap=\"${1|round,butt|}\"", documentation: "`round` or `butt`, defaults to `round`, specifies if the end caps of lines should be rounded or squared." },

        // Circles
        { type: FitbitAttributFamily.Circle, label: "cx", detail: "Center x", documentation: "Coordinate x of the center of the circle" },
        { type: FitbitAttributFamily.Circle, label: "cy", detail: "Center y", documentation: "Coordinate y of the center of the circle" },
        { type: FitbitAttributFamily.Circle, label: "r", detail: "Radius", documentation: "Radius of the circle." },

        // Images
        { type: FitbitAttributFamily.Href, label: "href", detail: "Image href", documentation: "Relative path to the element to use." },

        // Text
        { type: FitbitAttributFamily.Text, label: "text-anchor", detail: "Text anchor", insertText: "text-anchor=\"${1|start,middle,end|}\"", documentation: "Can be `start`, `middle`, `end`." },
        { type: FitbitAttributFamily.Text, label: "text-buffer", detail: "Text buffer", documentation: "Holds the text string." },
        { type: FitbitAttributFamily.Text, label: "text-length", detail: "Text length", documentation: "Specifies the number of characters to reserve for the text string. Will be rounded up to a multiple of 4." },
        { type: FitbitAttributFamily.Text, label: "letter-spacing", detail: "Letter spacing", documentation: "Letter spacing in pixels." },
        { type: FitbitAttributFamily.Text, label: "text-overflow", detail: "Text overflow", insertText: "text-overflow=\"${1|clip,ellipsis|}\"", documentation: "Can be `clip` or `ellipsis`." },
        { type: FitbitAttributFamily.Text, label: "font-family", detail: "Font family", insertText: "font-family=\"${1|System-Regular,System-Light,System-Bold|}\"", documentation: "Embedding custom fonts is not supported at this time, but we recommend using a library like `fitfont` to generate images of each character.\n\nSystem Font:\n System-Regular, System-Light, System-Bold" },
        { type: FitbitAttributFamily.Text, label: "font-size", detail: "Font size:", documentation: "Specifies the font size in pixels." },
        { type: FitbitAttributFamily.Text, label: "font-weigh", detail: "Font weigh", insertText: "font-weigh=\"${1|light,regular,bold|}\"", documentation: "specifies the character outline thickness (`light`, `regular`, or `bold`)." },
        { type: FitbitAttributFamily.Text, label: "text-decoration", detail: "Text decoration", insertText: "text-decoration=\"underline\"", documentation: "Specifies the if the text will be underlined or not." },

        // Textarea
        { type: FitbitAttributFamily.TextArea, label: "display-align", detail: "Display align", insertText: "=\"${1|before,center,after|}\"", documentation: "Specifies the vertical alignment (`before`, `center`, `after`)." },
        { type: FitbitAttributFamily.TextArea, label: "line-increment", detail: "Line increment", documentation: "Specifies the line, or row height." },
        { type: FitbitAttributFamily.TextArea, label: "rows", detail: "Rows number", documentation: "Constrains the number of rows." },

        // Arc
        { type: FitbitAttributFamily.Arc, label: "arc-width", detail: "Arc width", documentation: "Arc thickness in pixels, or `%-expression`. Maximum 31." },
        { type: FitbitAttributFamily.Arc, label: "start-angle", detail: "Start angle", documentation: "Start angle in degrees, with 0 at 12 o'clock." },
        { type: FitbitAttributFamily.Arc, label: "sweep-angle", detail: "Sweep angle", documentation: "Length of the arc in degrees." },

        // G container
        { type: FitbitAttributFamily.Transform, label: "transform", detail: "Transform", insertText: "transform=\"${1|translate(50%\\,50%),rotate(45),scale(2)|}\"", documentation: "The `<g>` container can be used to translate (move), rotate, and/or scale, all of the elements it contains.\n\nThe transformations are applied to the coordinates of its child elements.\n\nThe `<animateTransform>` can be used to animate the `<g>` transformations. It is the only element that supports rotation and the only one that can be a valid parent of `<animateTransform>`." },

        // Gradient Rectangle
        { type: FitbitAttributFamily.Gradient, label: "gradient-x1", detail: "Gradient x1", documentation: "Define x value of the first set of coordinates." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-y1", detail: "Gradient y1", documentation: "Define y value of the first set of coordinates." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-x2", detail: "Gradient x2", documentation: "Define x value of the second set of coordinates." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-y2", detail: "Gradient y2", documentation: "Define y value of the second set of coordinates." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-type", detail: "Gradient type", insertText: "gradient-type=\"${1|linear,radial,bilinear|}\"", documentation: "The type of effect to use, linear, radial, or bilinear." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-color1", detail: "Gradient color 1", documentation: "specify colors that are used in all gradient types." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-color2", detail: "Gradient color 2", documentation: "specify colors that are used in all gradient types." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-color3", detail: "Gradient color 3", documentation: "specify colors that are only used in bilinear gradients." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-color4", detail: "Gradient color 4", documentation: "specify colors that are only used in bilinear gradients." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-opacity1", detail: "Gradient opacity 1", documentation: "Opacity of gradient color ." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-opacity2", detail: "Gradient opacity 2", documentation: "Opacity of gradient color ." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-opacity3", detail: "Gradient opacity 3", documentation: "Opacity of gradient color ." },
        { type: FitbitAttributFamily.Gradient, label: "gradient-opacity4", detail: "Gradient opacity 4", documentation: "Opacity of gradient color ." },

        // Template Symbols
        { type: FitbitAttributFamily.Set, label: "attributeName", detail: "Attribute name to set", insertText: "attributeName=\"${1|x,y,height,width,href,text-buffer,fill,opacity,cx,cy,r|}\"", documentation: "Attribut to set to `<symbol>` or `<animation>`." },
        { type: FitbitAttributFamily.Set, label: "to", detail: "To", documentation: "Value to set on the child of a `<symbol>` element or an `<animation>`." },

        // Link
        { type: FitbitAttributFamily.Link, label: "rel", detail: "Relation type", insertText: "rel=\"${1|stylesheet,import|}\"", documentation: "Add a link to a file to use." },

        // Animations
        { type: FitbitAttributFamily.Animation, label: "begin", detail: "Begin event", insertText: "begin=\"${1|activate,click,disable,enable,load,mousedown,mousemove,mouseup|}\"", documentation: "Specify the event(s) that start the animation." },
        { type: FitbitAttributFamily.Animation, label: "end", detail: "End event", insertText: "end=\"${1|activate,click,disable,enable,load,mousedown,mousemove,mouseup|}\"", documentation: "Specify the event(s) that end the animation." },
        { type: FitbitAttributFamily.Animation, label: "final", detail: "Final state", insertText: "final=\"${1|freeze,remove,restore,keep|}\"", documentation: "Specifies the value of the attribute once the animation ends." },
        { type: FitbitAttributFamily.Animation, label: "easing", detail: "Easing", insertText: "easing=\"${1|linear,ease,ease-in,ease-out,ease-in-out,ease-out-in|}\"", documentation: "Can be used to specify a non-linear change in the animation." },
        { type: FitbitAttributFamily.Animation, label: "dur", detail: "Duration", documentation: "Can be used to specify a duration for an animation." },
        { type: FitbitAttributFamily.Animation, label: "repeatCount", detail: "Repeat count ", documentation: "Can be used to repeat the animations x times." },
        { type: FitbitAttributFamily.Animation, label: "repeatDur", detail: "Repeat duration", documentation: "Can be used to repeat the animations during x seconds." },

        // Transformation Animations
        { type: FitbitAttributFamily.TransformationAnimation, label: "attributeType", detail: "Type of transformation", insertText: "attributeType=\"${1|translate,rotate,scale|}\"", documentation: "specifies the transformation to animate: `translate, `rotate`, or `scale`." },
        { type: FitbitAttributFamily.TransformationAnimation, label: "from", detail: "From", documentation: "Specify the start value of a `<animateTransform>`." },
    ]
};
