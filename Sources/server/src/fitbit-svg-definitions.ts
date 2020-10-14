export namespace FitbitSvgType {
    export const Container = 1;
    export const Control = 2;
    export const Attribut = 3;
}
export declare type FitbitSvgType = 1 | 2 | 3;

export interface IFitbitDefinition {
    type: FitbitSvgType;
    label: string;
    detail: string;
    documentation?: string;
}

export const fitbitDefinitions: IFitbitDefinition[] = [
    { type: FitbitSvgType.Container, label: "svg", detail: "SVG container" },
    { type: FitbitSvgType.Container, label: "section", detail: "Section container" },
    { type: FitbitSvgType.Container, label: "g", detail: "G Container", documentation: "The `<g>` container can be used to translate (move), rotate, and/or scale, all of the elements it contains.\n\nThe transformations are applied to the coordinates of its child elements.\n\nThe `<animateTransform>` can be used to animate the `<g>` transformations. It is the only element that supports rotation and the only one that can be a valid parent of `<animateTransform>`." },
    { type: FitbitSvgType.Attribut, label: "id", detail: "" },
    { type: FitbitSvgType.Attribut, label: "x", detail: "" },
    { type: FitbitSvgType.Attribut, label: "y", detail: "" },
    { type: FitbitSvgType.Attribut, label: "height", detail: "" },
    { type: FitbitSvgType.Attribut, label: "widht", detail: "" }
];