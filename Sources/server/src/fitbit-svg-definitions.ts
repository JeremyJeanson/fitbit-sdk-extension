import { callbackify } from "util";

export namespace FitbitSvgType {
    export const Container = 1;
    export const Attribut = 2;
}
export declare type FitbitSvgType = 1 | 2;

export interface IFitbitDefinition {
    type: FitbitSvgType;
    label: string;
    detail: string;
}

export const fitbitDefinitions: IFitbitDefinition[] = [
    { type: FitbitSvgType.Container, label: "svg", detail: "SVG container" },
    { type: FitbitSvgType.Container, label: "section", detail: "Section container" },
    { type: FitbitSvgType.Container, label: "g", detail: "Group container" },

    { type: FitbitSvgType.Attribut, label: "id", detail: "" },
    { type: FitbitSvgType.Attribut, label: "x", detail: "" },
    { type: FitbitSvgType.Attribut, label: "y", detail: "" },
    { type: FitbitSvgType.Attribut, label: "height", detail: "" },
    { type: FitbitSvgType.Attribut, label: "widht", detail: "" }
];