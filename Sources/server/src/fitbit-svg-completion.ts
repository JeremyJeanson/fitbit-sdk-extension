import { resolveTxt } from "dns";
import { CompletionItem, CompletionItemKind, InsertTextFormat, Range, TextDocumentPositionParams, TextDocuments, TypeDefinitionRequest } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { fitbitDefinitions, FitbitSvgType, IFitbitDefinition } from "./fitbit-svg-definitions";

let _doc: TextDocument;

export function setDocument(doc: TextDocument): void {
    _doc = doc;
}

/**
 * Completion is requested
 * @param params 
 */
export function oncompletion(params: TextDocumentPositionParams): CompletionItem[] {
    // Get the chars who triggered the request
    const previousChar = _doc.getText(Range.create(
        params.position.line, params.position.character - 1,
        params.position.line, params.position.character));

    if (previousChar === "<") {
        const nodesDefinitions = fitbitDefinitions.filter(c => c.type === FitbitSvgType.Container);
        return getCompletionItem(nodesDefinitions);
    }

    const nodesDefinitions = fitbitDefinitions.filter(c => c.type === FitbitSvgType.Attribut);
    return getCompletionItem(nodesDefinitions);
}

function getCompletionItem(definitionsFiltered: IFitbitDefinition[]): CompletionItem[] {
    const result: CompletionItem[] = [];
    for (let i = 0; i < definitionsFiltered.length; i++) {
        if (definitionsFiltered[i].type === FitbitSvgType.Container) {
            result.push({
                data: fitbitDefinitions.indexOf(definitionsFiltered[i]),
                label: definitionsFiltered[i].label,
                insertText: `${definitionsFiltered[i].label}>\n\t$1\n</${definitionsFiltered[i].label}>`,
                insertTextFormat: InsertTextFormat.Snippet,
                kind: CompletionItemKind.Class,
            })
        }

        result.push({
            data: fitbitDefinitions.indexOf(definitionsFiltered[i]),
            label: definitionsFiltered[i].label,
            insertText: `${definitionsFiltered[i].label}=\"$1\"`,
            insertTextFormat: InsertTextFormat.Snippet,
            kind: CompletionItemKind.Property,
        })
    }
    return result;
}

/**
 * Completion need more informations
 * @param item 
 */
export function onCompletionResolve(item: CompletionItem): CompletionItem {
    // Check the id
    if (item.data === undefined || item.kind !== CompletionItemKind.Module) return item;
    // Try to get more data from definitions
    const definition = fitbitDefinitions[item.data];
    // Check the definition
    if (definition == undefined) return item;
    // Add more data from the definition
    item.detail = definition.detail;
    item.documentation = "Fitbit SDK documentation";
    return item;
}