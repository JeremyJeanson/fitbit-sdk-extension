/* eslint-disable @typescript-eslint/naming-convention */ // Conflict with enum convention

/**
 * Bas of all definitions
 */
export interface IFitbitDefinition {
    label: string;
    insertText?: string;
    detail: string;
    documentation: string;
}

/**
 * Attribut type
 */
export const enum FitbitAttributType {
    Id,
    Box,
    Visual,
    Line,
    Circle,
    Href,
    Text,
    TextArea,
    Arc,
    Transform,
    Gradient,
    Set,
    Link,
    Animation,
    TransformationAnimation,
}

/**
 * Special type of Element
 */
export const enum FitbitElementType {
    Container,
    Misc,
}

/**
 * Type of value (to allow completion of values for attributs)
 */
export const enum FitbitValueType {
    Color
}

/**
 * Define an Element 
 */
export interface IFitbitElementDefinition extends IFitbitDefinition {
    special?: FitbitElementType;
    attributs: FitbitAttributType[];
}

/**
 * Define an Attribut
 */
export interface IFitbitAttributDefinition extends IFitbitDefinition {
    type: FitbitAttributType;
    valueType?: FitbitValueType;
}

export interface IFitbitValue {
    type: FitbitValueType,
    value: string;
}

/**
 * Define the definition container
 */
export interface FitbitDefinitions {
    elements: IFitbitElementDefinition[];
    attributs: IFitbitAttributDefinition[];
    values: IFitbitValue[];
}

/**
 * Contain the definnition off all fitbit element use in SVG files
 */
export const fitbitDefinitions: FitbitDefinitions = {
    elements: [
        // Comment
        {
            label: "!--", insertText: "!-- $0 -->", detail: "Comment", documentation: "Comment",
            special: FitbitElementType.Misc, attributs: []
        },
        // Base
        {
            label: "svg", detail: "SVG Container", documentation: "This element is a container for all elements.",
            special: FitbitElementType.Container, attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box,]
        },

        // Line
        {
            label: "line", detail: "Lines", documentation: "The `<line>` element draws a line between two pairs of coordinates.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Line]
        },

        // Rectangles
        {
            label: "rect", detail: "Rectangles", documentation: "The `<rect>` element allows you to draw rectangles on the screen.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box]
        },

        // Circles
        {
            label: "circle", detail: "Circle", documentation: "Draw a circle.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box, FitbitAttributType.Circle]
        },

        // Image
        {
            label: "image", detail: "Image", documentation: "You can display images in your application in either PNG or JPEG formats. PNG format is preferable as it is compiled into a hardware accelerated TXI format during compilation. JPEG files are smaller, but take longer to render. Note that Progressive JPEG files are not supported.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box, FitbitAttributType.Href]
        },

        // Text
        {
            label: "text", detail: "Text", documentation: "A single line of text.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box, FitbitAttributType.Text]
        },

        // Textarea
        {
            label: "textarea", detail: "Text area", documentation: "While `<text>` should be used for a single line of text, the `<textarea>` element displays text over multiple lines.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box, FitbitAttributType.Text, FitbitAttributType.TextArea]
        },

        // Arc
        {
            label: "arc", detail: "Arc", documentation: "Draws an arc, circular or elliptical.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box, FitbitAttributType.Arc]
        },

        // Defs
        {
            label: "defs", "detail": "Defs Container", documentation: "`<defs>` is a container element that should be used to include `<symbol>` and stylesheet definitions that will be used by the document.\n\nElements placed inside the `<defs>` container are not rendered.",
            special: FitbitElementType.Container, attributs: []
        },

        // Section
        {
            label: "section", detail: "Section Container", documentation: "This element is a container that can be used instead of the `<svg>` when only position and size properties of the container are required. It establishes a new coordinate system for the element it contains.\n\nThe `<section>` element has less attributes than `<svg>` and, therefore, consumes less memory.",
            special: FitbitElementType.Container, attributs: [FitbitAttributType.Id, FitbitAttributType.Box]
        },

        // G container
        {
            label: "g", detail: "G Container", documentation: "The `<g>` container can be used to translate (move), rotate, and/or scale, all of the elements it contains.\n\nThe transformations are applied to the coordinates of its child elements.\n\nThe `<animateTransform>` can be used to animate the `<g>` transformations. It is the only element that supports rotation and the only one that can be a valid parent of `<animateTransform>`.",
            special: FitbitElementType.Container, attributs: [FitbitAttributType.Id, FitbitAttributType.Transform]
        },

        // Gradient Rectangle
        {
            label: "gradientRect", detail: "Gradient rectangle", documentation: "The `<gradientRect>` element fills a rectangle with a color texture, without the use of a bitmap. It can blend two colors when the gradient type is `linear` or `radial`, or four colors when the type is bilinear.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box, FitbitAttributType.Gradient]
        },

        // gradientArc
        {
            label: "gradientArc", detail: "Gradient arc", documentation: "The `<gradientArc>` element fills an arc with a color texture, without the use of a bitmap. It can blend two colors when the gradient type is `linear` or `radial`, or four colors when the type is bilinear.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box, FitbitAttributType.Gradient]
        },

        // Mask
        {
            label: "mask", detail: "Mask", insertText: " id=\"${1}\"", documentation: "<mask> is a container element that creates a mask which can be used by `<svg>` elements for visual effects. It can contain any graphical elements or container elements such as <g>.\n\nThe `<svg>` element that uses the mask element will be painted through the mask. Only the overlapping areas will remain.",
            special: FitbitElementType.Container, attributs: [FitbitAttributType.Id]
        },

        // Template Symbols
        {
            label: "symbol", detail: "Template symbol", insertText: "id=\"${1}\"", documentation: "By defining an element as a `<symbol>`, developers can reuse that same element multiple times without having to duplicate the same markup. The `<set>` element can be used to modify attributes of each instance of the `<symbol>`.",
            special: FitbitElementType.Container, attributs: [FitbitAttributType.Id]
        },
        {
            label: "use", detail: "Use a symbol", insertText: "href=\"#${1}\"", documentation: "Allow to use a `<symbol>`.",
            special: FitbitElementType.Container, attributs: [FitbitAttributType.Id, FitbitAttributType.Visual, FitbitAttributType.Box, FitbitAttributType.Href]
        },
        {
            label: "set", detail: "Set a symbol element attribut", insertText: "href=\"${1}\" attributeName=\"${2|x,y,height,width,href,text-buffer,fill,opacity,cx,cy,r|}\" to=\"${3}\"", documentation: "The `<set>` element can be used to modify attributes of each instance of the `<symbol>`.",
            attributs: [FitbitAttributType.Id, FitbitAttributType.Set]
        },

        // Link
        {
            label: "link", detail: "Link file", documentation: "Add a link to a file to use.",
            attributs: [FitbitAttributType.Link, FitbitAttributType.Href]
        },

        // Animations
        {
            label: "animate", detail: "Animate an element", documentation: "Property animations allow the simple manipulation of an element's attributes. For example, changing the opacity, or the coordinates of an element.\n\nTo create a property animation, the `<animate>` element should be added as a child of the element you want to animate.",
            attributs: [FitbitAttributType.Animation]
        },

        // Transformation Animations
        {
            label: "animateTransform", detail: "Transformation animation", documentation: "Transformation animations allow an element to be easily translated (moved), scaled and rotated.\n\nThe `<animateTransform>` element must be added as a child of a `<g>` element, alongside the elements you want to manipulate.",
            attributs: [FitbitAttributType.Animation, FitbitAttributType.TransformationAnimation]
        },

    ],
    attributs: [
        // common to all
        { type: FitbitAttributType.Id, label: "id", detail: "Id", documentation: "Id to get the element from JavasScript or TypeScript via document.getElementById()." },

        // Box
        { type: FitbitAttributType.Box, label: "x", detail: "x coordinate", documentation: "Horizontal position of the element." },
        { type: FitbitAttributType.Box, label: "y", detail: "y coordinate", documentation: "Vertisal position of the element." },
        { type: FitbitAttributType.Box, label: "height", detail: "Height", documentation: "Height of the element." },
        { type: FitbitAttributType.Box, label: "width", detail: "Width", documentation: "Width of the element" },

        // Visual
        { type: FitbitAttributType.Visual, label: "class", detail: "CSS", documentation: "Classes to apply to the element." },
        {
            type: FitbitAttributType.Visual, label: "fill", detail: "Fill color", documentation: "Color to fill the element or inner elements.",
            valueType: FitbitValueType.Color
        },
        {
            type: FitbitAttributType.Visual, label: "viewport-fill", detail: "Viewport fill color", documentation: "Color to fill the element or inner elements.",
            valueType: FitbitValueType.Color
        },
        { type: FitbitAttributType.Visual, label: "opacity", detail: "Opacity", documentation: "Specifies the opacity of the element (between 0 and 1)." },
        { type: FitbitAttributType.Visual, label: "visibility", detail: "Visibility", insertText: "visibility=\"${1|visible,hidden|}\"", documentation: "Specifies if the line should be `visible` or `hidden`." },
        { type: FitbitAttributType.Visual, label: "display", detail: "Display", insertText: "display=\"${1|none,inline,inherit|}\"", documentation: "none, inline or inherit." },
        { type: FitbitAttributType.Visual, label: "pointer-events", detail: "Pointer events", insertText: "pointer-events=\"visible\"", documentation: "Enable touch events to the element.\n\n You can attach a handler to the `mouseup`, `mousedown` and `mousemove` events." },

        //Line
        { type: FitbitAttributType.Line, label: "stroke-width", detail: "Thickness", documentation: "The thickness of the line.\n\nMaximum 32" },
        { type: FitbitAttributType.Line, label: "stroke-linecap", detail: "End caps of lines", insertText: "stroke-linecap=\"${1|round,butt|}\"", documentation: "`round` or `butt`, defaults to `round`, specifies if the end caps of lines should be rounded or squared." },

        // Circles
        { type: FitbitAttributType.Circle, label: "cx", detail: "Center x", documentation: "Coordinate x of the center of the circle" },
        { type: FitbitAttributType.Circle, label: "cy", detail: "Center y", documentation: "Coordinate y of the center of the circle" },
        { type: FitbitAttributType.Circle, label: "r", detail: "Radius", documentation: "Radius of the circle." },

        // Images
        { type: FitbitAttributType.Href, label: "href", detail: "Image href", documentation: "Relative path to the element to use." },

        // Text
        { type: FitbitAttributType.Text, label: "text-anchor", detail: "Text anchor", insertText: "text-anchor=\"${1|start,middle,end|}\"", documentation: "Can be `start`, `middle`, `end`." },
        { type: FitbitAttributType.Text, label: "text-buffer", detail: "Text buffer", documentation: "Holds the text string." },
        { type: FitbitAttributType.Text, label: "text-length", detail: "Text length", documentation: "Specifies the number of characters to reserve for the text string. Will be rounded up to a multiple of 4." },
        { type: FitbitAttributType.Text, label: "letter-spacing", detail: "Letter spacing", documentation: "Letter spacing in pixels." },
        { type: FitbitAttributType.Text, label: "text-overflow", detail: "Text overflow", insertText: "text-overflow=\"${1|clip,ellipsis|}\"", documentation: "Can be `clip` or `ellipsis`." },
        { type: FitbitAttributType.Text, label: "font-family", detail: "Font family", insertText: "font-family=\"${1|System-Regular,System-Light,System-Bold|}\"", documentation: "Embedding custom fonts is not supported at this time, but we recommend using a library like `fitfont` to generate images of each character.\n\nSystem Font:\n System-Regular, System-Light, System-Bold" },
        { type: FitbitAttributType.Text, label: "font-size", detail: "Font size:", documentation: "Specifies the font size in pixels." },
        { type: FitbitAttributType.Text, label: "font-weigh", detail: "Font weigh", insertText: "font-weigh=\"${1|light,regular,bold|}\"", documentation: "specifies the character outline thickness (`light`, `regular`, or `bold`)." },
        { type: FitbitAttributType.Text, label: "text-decoration", detail: "Text decoration", insertText: "text-decoration=\"underline\"", documentation: "Specifies the if the text will be underlined or not." },

        // Textarea
        { type: FitbitAttributType.TextArea, label: "display-align", detail: "Display align", insertText: "=\"${1|before,center,after|}\"", documentation: "Specifies the vertical alignment (`before`, `center`, `after`)." },
        { type: FitbitAttributType.TextArea, label: "line-increment", detail: "Line increment", documentation: "Specifies the line, or row height." },
        { type: FitbitAttributType.TextArea, label: "rows", detail: "Rows number", documentation: "Constrains the number of rows." },

        // Arc
        { type: FitbitAttributType.Arc, label: "arc-width", detail: "Arc width", documentation: "Arc thickness in pixels, or `%-expression`. Maximum 31." },
        { type: FitbitAttributType.Arc, label: "start-angle", detail: "Start angle", documentation: "Start angle in degrees, with 0 at 12 o'clock." },
        { type: FitbitAttributType.Arc, label: "sweep-angle", detail: "Sweep angle", documentation: "Length of the arc in degrees." },

        // G container
        { type: FitbitAttributType.Transform, label: "transform", detail: "Transform", insertText: "transform=\"${1|translate(50%\\,50%),rotate(45),scale(2)|}\"", documentation: "The `<g>` container can be used to translate (move), rotate, and/or scale, all of the elements it contains.\n\nThe transformations are applied to the coordinates of its child elements.\n\nThe `<animateTransform>` can be used to animate the `<g>` transformations. It is the only element that supports rotation and the only one that can be a valid parent of `<animateTransform>`." },

        // Gradient Rectangle
        { type: FitbitAttributType.Gradient, label: "gradient-x1", detail: "Gradient x1", documentation: "Define x value of the first set of coordinates." },
        { type: FitbitAttributType.Gradient, label: "gradient-y1", detail: "Gradient y1", documentation: "Define y value of the first set of coordinates." },
        { type: FitbitAttributType.Gradient, label: "gradient-x2", detail: "Gradient x2", documentation: "Define x value of the second set of coordinates." },
        { type: FitbitAttributType.Gradient, label: "gradient-y2", detail: "Gradient y2", documentation: "Define y value of the second set of coordinates." },
        { type: FitbitAttributType.Gradient, label: "gradient-type", detail: "Gradient type", insertText: "gradient-type=\"${1|linear,radial,bilinear|}\"", documentation: "The type of effect to use, linear, radial, or bilinear." },
        { type: FitbitAttributType.Gradient, label: "gradient-color1", detail: "Gradient color 1", documentation: "specify colors that are used in all gradient types." },
        { type: FitbitAttributType.Gradient, label: "gradient-color2", detail: "Gradient color 2", documentation: "specify colors that are used in all gradient types." },
        { type: FitbitAttributType.Gradient, label: "gradient-color3", detail: "Gradient color 3", documentation: "specify colors that are only used in bilinear gradients." },
        { type: FitbitAttributType.Gradient, label: "gradient-color4", detail: "Gradient color 4", documentation: "specify colors that are only used in bilinear gradients." },
        { type: FitbitAttributType.Gradient, label: "gradient-opacity1", detail: "Gradient opacity 1", documentation: "Opacity of gradient color ." },
        { type: FitbitAttributType.Gradient, label: "gradient-opacity2", detail: "Gradient opacity 2", documentation: "Opacity of gradient color ." },
        { type: FitbitAttributType.Gradient, label: "gradient-opacity3", detail: "Gradient opacity 3", documentation: "Opacity of gradient color ." },
        { type: FitbitAttributType.Gradient, label: "gradient-opacity4", detail: "Gradient opacity 4", documentation: "Opacity of gradient color ." },

        // Template Symbols
        { type: FitbitAttributType.Set, label: "attributeName", detail: "Attribute name to set", insertText: "attributeName=\"${1|x,y,height,width,href,text-buffer,fill,opacity,cx,cy,r|}\"", documentation: "Attribut to set to `<symbol>` or `<animation>`." },
        { type: FitbitAttributType.Set, label: "to", detail: "To", documentation: "Value to set on the child of a `<symbol>` element or an `<animation>`." },

        // Link
        { type: FitbitAttributType.Link, label: "rel", detail: "Relation type", insertText: "rel=\"${1|stylesheet,import|}\"", documentation: "Add a link to a file to use." },

        // Animations
        { type: FitbitAttributType.Animation, label: "begin", detail: "Begin event", insertText: "begin=\"${1|activate,click,disable,enable,load,mousedown,mousemove,mouseup|}\"", documentation: "Specify the event(s) that start the animation." },
        { type: FitbitAttributType.Animation, label: "end", detail: "End event", insertText: "end=\"${1|activate,click,disable,enable,load,mousedown,mousemove,mouseup|}\"", documentation: "Specify the event(s) that end the animation." },
        { type: FitbitAttributType.Animation, label: "final", detail: "Final state", insertText: "final=\"${1|freeze,remove,restore,keep|}\"", documentation: "Specifies the value of the attribute once the animation ends." },
        { type: FitbitAttributType.Animation, label: "easing", detail: "Easing", insertText: "easing=\"${1|linear,ease,ease-in,ease-out,ease-in-out,ease-out-in|}\"", documentation: "Can be used to specify a non-linear change in the animation." },
        { type: FitbitAttributType.Animation, label: "dur", detail: "Duration", documentation: "Can be used to specify a duration for an animation." },
        { type: FitbitAttributType.Animation, label: "repeatCount", detail: "Repeat count ", documentation: "Can be used to repeat the animations x times." },
        { type: FitbitAttributType.Animation, label: "repeatDur", detail: "Repeat duration", documentation: "Can be used to repeat the animations during x seconds." },

        // Transformation Animations
        { type: FitbitAttributType.TransformationAnimation, label: "attributeType", detail: "Type of transformation", insertText: "attributeType=\"${1|translate,rotate,scale|}\"", documentation: "specifies the transformation to animate: `translate, `rotate`, or `scale`." },
        { type: FitbitAttributType.TransformationAnimation, label: "from", detail: "From", documentation: "Specify the start value of a `<animateTransform>`." },
    ],
    values: [
        { type: FitbitValueType.Color, value: "aliceblue" },
        { type: FitbitValueType.Color, value: "antiquewhite" },
        { type: FitbitValueType.Color, value: "aqua" },
        { type: FitbitValueType.Color, value: "aquamarine" },
        { type: FitbitValueType.Color, value: "azure" },
        { type: FitbitValueType.Color, value: "beige" },
        { type: FitbitValueType.Color, value: "bisque" },
        { type: FitbitValueType.Color, value: "black" },
        { type: FitbitValueType.Color, value: "blanchedalmond" },
        { type: FitbitValueType.Color, value: "blue" },
        { type: FitbitValueType.Color, value: "blueviolet" },
        { type: FitbitValueType.Color, value: "brown" },
        { type: FitbitValueType.Color, value: "burlywood" },
        { type: FitbitValueType.Color, value: "cadetblue" },
        { type: FitbitValueType.Color, value: "chartreuse" },
        { type: FitbitValueType.Color, value: "chocolate" },
        { type: FitbitValueType.Color, value: "coral" },
        { type: FitbitValueType.Color, value: "cornflowerblue" },
        { type: FitbitValueType.Color, value: "cornsilk" },
        { type: FitbitValueType.Color, value: "crimson" },
        { type: FitbitValueType.Color, value: "cyan" },
        { type: FitbitValueType.Color, value: "darkblue" },
        { type: FitbitValueType.Color, value: "darkcyan" },
        { type: FitbitValueType.Color, value: "darkgoldenrod" },
        { type: FitbitValueType.Color, value: "darkgray" },
        { type: FitbitValueType.Color, value: "darkgreen" },
        { type: FitbitValueType.Color, value: "darkgrey" },
        { type: FitbitValueType.Color, value: "darkkhaki" },
        { type: FitbitValueType.Color, value: "darkmagenta" },
        { type: FitbitValueType.Color, value: "darkolivegreen" },
        { type: FitbitValueType.Color, value: "darkorange" },
        { type: FitbitValueType.Color, value: "darkorchid" },
        { type: FitbitValueType.Color, value: "darkred" },
        { type: FitbitValueType.Color, value: "darksalmon" },
        { type: FitbitValueType.Color, value: "darkseagreen" },
        { type: FitbitValueType.Color, value: "darkslateblue" },
        { type: FitbitValueType.Color, value: "darkslategray" },
        { type: FitbitValueType.Color, value: "darkslategrey" },
        { type: FitbitValueType.Color, value: "darkturquoise" },
        { type: FitbitValueType.Color, value: "darkviolet" },
        { type: FitbitValueType.Color, value: "deeppink" },
        { type: FitbitValueType.Color, value: "deepskyblue" },
        { type: FitbitValueType.Color, value: "dimgray" },
        { type: FitbitValueType.Color, value: "dimgrey" },
        { type: FitbitValueType.Color, value: "dodgerblue" },
        { type: FitbitValueType.Color, value: "firebrick" },
        { type: FitbitValueType.Color, value: "floralwhite" },
        { type: FitbitValueType.Color, value: "forestgreen" },
        { type: FitbitValueType.Color, value: "fuchsia" },
        { type: FitbitValueType.Color, value: "gainsboro" },
        { type: FitbitValueType.Color, value: "ghostwhite" },
        { type: FitbitValueType.Color, value: "gold" },
        { type: FitbitValueType.Color, value: "goldenrod" },
        { type: FitbitValueType.Color, value: "gray" },
        { type: FitbitValueType.Color, value: "green" },
        { type: FitbitValueType.Color, value: "greenyellow" },
        { type: FitbitValueType.Color, value: "grey" },
        { type: FitbitValueType.Color, value: "honeydew" },
        { type: FitbitValueType.Color, value: "hotpink" },
        { type: FitbitValueType.Color, value: "indianred" },
        { type: FitbitValueType.Color, value: "indigo" },
        { type: FitbitValueType.Color, value: "ivory" },
        { type: FitbitValueType.Color, value: "khaki" },
        { type: FitbitValueType.Color, value: "lavender" },
        { type: FitbitValueType.Color, value: "lavenderblush" },
        { type: FitbitValueType.Color, value: "lawngreen" },
        { type: FitbitValueType.Color, value: "lemonchiffon" },
        { type: FitbitValueType.Color, value: "lightblue" },
        { type: FitbitValueType.Color, value: "lightcoral" },
        { type: FitbitValueType.Color, value: "lightcyan" },
        { type: FitbitValueType.Color, value: "lightgoldenrodyellow" },
        { type: FitbitValueType.Color, value: "lightgray" },
        { type: FitbitValueType.Color, value: "lightgreen" },
        { type: FitbitValueType.Color, value: "lightgrey" },
        { type: FitbitValueType.Color, value: "lightpink" },
        { type: FitbitValueType.Color, value: "lightsalmon" },
        { type: FitbitValueType.Color, value: "lightseagreen" },
        { type: FitbitValueType.Color, value: "lightskyblue" },
        { type: FitbitValueType.Color, value: "lightslategray" },
        { type: FitbitValueType.Color, value: "lightslategrey" },
        { type: FitbitValueType.Color, value: "lightsteelblue" },
        { type: FitbitValueType.Color, value: "lightyellow" },
        { type: FitbitValueType.Color, value: "lime" },
        { type: FitbitValueType.Color, value: "limegreen" },
        { type: FitbitValueType.Color, value: "linen" },
        { type: FitbitValueType.Color, value: "magenta" },
        { type: FitbitValueType.Color, value: "maroon" },
        { type: FitbitValueType.Color, value: "mediumaquamarine" },
        { type: FitbitValueType.Color, value: "mediumblue" },
        { type: FitbitValueType.Color, value: "mediumorchid" },
        { type: FitbitValueType.Color, value: "mediumpurple" },
        { type: FitbitValueType.Color, value: "mediumseagreen" },
        { type: FitbitValueType.Color, value: "mediumslateblue" },
        { type: FitbitValueType.Color, value: "mediumspringgreen" },
        { type: FitbitValueType.Color, value: "mediumturquoise" },
        { type: FitbitValueType.Color, value: "mediumvioletred" },
        { type: FitbitValueType.Color, value: "midnightblue" },
        { type: FitbitValueType.Color, value: "mintcream" },
        { type: FitbitValueType.Color, value: "mistyrose" },
        { type: FitbitValueType.Color, value: "moccasin" },
        { type: FitbitValueType.Color, value: "navajowhite" },
        { type: FitbitValueType.Color, value: "navy" },
        { type: FitbitValueType.Color, value: "oldlace" },
        { type: FitbitValueType.Color, value: "olive" },
        { type: FitbitValueType.Color, value: "olivedrab" },
        { type: FitbitValueType.Color, value: "orange" },
        { type: FitbitValueType.Color, value: "orangered" },
        { type: FitbitValueType.Color, value: "orchid" },
        { type: FitbitValueType.Color, value: "palegoldenrod" },
        { type: FitbitValueType.Color, value: "palegreen" },
        { type: FitbitValueType.Color, value: "paleturquoise" },
        { type: FitbitValueType.Color, value: "palevioletred" },
        { type: FitbitValueType.Color, value: "papayawhip" },
        { type: FitbitValueType.Color, value: "peachpuff" },
        { type: FitbitValueType.Color, value: "peru" },
        { type: FitbitValueType.Color, value: "pink" },
        { type: FitbitValueType.Color, value: "plum" },
        { type: FitbitValueType.Color, value: "powderblue" },
        { type: FitbitValueType.Color, value: "purple" },
        { type: FitbitValueType.Color, value: "red" },
        { type: FitbitValueType.Color, value: "rosybrown" },
        { type: FitbitValueType.Color, value: "royalblue" },
        { type: FitbitValueType.Color, value: "saddlebrown" },
        { type: FitbitValueType.Color, value: "salmon" },
        { type: FitbitValueType.Color, value: "sandybrown" },
        { type: FitbitValueType.Color, value: "seagreen" },
        { type: FitbitValueType.Color, value: "seashell" },
        { type: FitbitValueType.Color, value: "sienna" },
        { type: FitbitValueType.Color, value: "silver" },
        { type: FitbitValueType.Color, value: "skyblue" },
        { type: FitbitValueType.Color, value: "slateblue" },
        { type: FitbitValueType.Color, value: "slategray" },
        { type: FitbitValueType.Color, value: "slategrey" },
        { type: FitbitValueType.Color, value: "snow" },
        { type: FitbitValueType.Color, value: "springgreen" },
        { type: FitbitValueType.Color, value: "steelblue" },
        { type: FitbitValueType.Color, value: "tan" },
        { type: FitbitValueType.Color, value: "teal" },
        { type: FitbitValueType.Color, value: "thistle" },
        { type: FitbitValueType.Color, value: "tomato" },
        { type: FitbitValueType.Color, value: "turquoise" },
        { type: FitbitValueType.Color, value: "violet" },
        { type: FitbitValueType.Color, value: "wheat" },
        { type: FitbitValueType.Color, value: "white" },
        { type: FitbitValueType.Color, value: "whitesmoke" },
        { type: FitbitValueType.Color, value: "yellow" },
        { type: FitbitValueType.Color, value: "yellowgreen" }
    ]
};
