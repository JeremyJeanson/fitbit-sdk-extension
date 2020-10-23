import { Hover, HoverParams, MarkupKind, Range } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { fitbitDefinitions } from "./fitbit-svg-definitions";

/**
 * Data about the word found
 */
interface IWord {
    value: string;
    range: Range;
    type: WordType | undefined;
}

/**
 * Type of word limiter
 */
const enum WordType {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Attribut,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Element
}

/**
 * word limiter found
 */
interface WordLimiter {
    index: number;
    type: WordType | undefined;
}

/**
 * Text hover is requiered
 * @param document 
 * @param params 
 */
export function onHover(document: TextDocument, params: HoverParams): Hover | undefined {
    // Get the current word
    const word = getWord(document, params.position);
    if (word === undefined) { return undefined; }

    // Get the definition
    const definition = getDocumentation(word.value, word.type);
    if (definition === undefined) { return undefined; }

    return {
        // Content as markdown
        contents: {
            kind: MarkupKind.Markdown,
            value: definition
        },
        range: word.range
    };
}

/**
 * Get the word at the position
 * @param document 
 * @param position 
 */
function getWord(document: TextDocument, position: Position): IWord | undefined {
    // Read the line
    const line = document.getText(
        Range.create(
            position.line, 0,
            position.line, Number.MAX_VALUE));
    // Define the start of the word
    const start = getLimiterStart(line, position.character);
    // Define the end of the word
    const end = getLimiterEnd(line, position.character);

    return {
        // Get value from the line
        value: line.substring(start.index, end.index)
            .toLowerCase(),
        // Creat range form start and end
        range: Range.create(
            position.line, start.index,
            position.line, end.index),
        // Define type from limiters
        type: start.type !== undefined
            ? start.type
            : end.type
    };
}

function getLimiterStart(line: string, characterPosition: number): WordLimiter {
    const subLine = line.substring(0, characterPosition);
    // Get the last index of attributs limiters " "
    const attributIndex = subLine.lastIndexOf(" ");
    // Get the last index of element limiters "<", "/"
    const elementIndexs: number[] =
        // Array of possible limiters
        [subLine.lastIndexOf("<"),
        subLine.lastIndexOf("/")]
            // Filter only when limiter was found
            .filter(c => c !== undefined)
            // Math.min didn't work with this array
            // Choice was made to sort items and get only this firt to have the min
            .sort((a, b) => b - a);

    const elementIndex = elementIndexs.length > 0
        ? elementIndexs[0]
        : undefined;

    // No limiter found
    if (attributIndex === undefined && elementIndex === undefined) {
        return {
            index: 0,
            type: undefined
        };
    }

    // Found the upper index
    if ((attributIndex ?? -1) > (elementIndex ?? -1)) {
        // Attribut
        return {
            index: attributIndex === undefined
                ? 0
                : attributIndex + 1,
            type: WordType.Attribut
        };
    }
    // Element
    return {
        index: elementIndex === undefined
            ? 0
            : elementIndex + 1,
        type: WordType.Element
    };
}

function getLimiterEnd(line: string, characterPosition: number): WordLimiter {
    const subLine = line.substring(characterPosition);
    // Get the first index of attributs limiters "="
    const attributIndex = subLine.indexOf("=");
    // Get the first  index of element limiters " ", ">", "/"
    const elementIndexs: number[] =
        // Array of possible limiters
        [subLine.indexOf(" "),
        subLine.indexOf(">"),
        subLine.indexOf("/")]
            // Filter only when limiter was found
            .filter(c => c >= 0)
            // Math.min didn't work with this array
            // Choice was made to sort items and get only this firt to have the min
            .sort((a, b) => a - b);

    const elementIndex = elementIndexs.length > 0
        ? elementIndexs[0]
        : -1;

    // No limiter found
    if (attributIndex < 0 && elementIndex < 0) {
        return {
            index: characterPosition,
            type: undefined
        };
    }

    // Found the lower index
    if (attributIndex >= 0 && attributIndex < elementIndex) {
        // Attribut
        return {
            index: characterPosition + attributIndex,
            type: WordType.Attribut
        };
    }
    // Element
    return {
        index: elementIndex < 0
            ? characterPosition
            : characterPosition + elementIndex,
        type: WordType.Element
    };
}

/**
 * Try to get the documentation
 * @param word 
 * @param type 
 */
function getDocumentation(word: string, type: WordType | undefined): string | undefined {
    // Test the type
    switch (type) {
        case WordType.Attribut: {
            const documentation = getDocumentationFromAttributs(word);
            if (documentation !== undefined) { return documentation; }
            break;
        }
        case WordType.Element: {
            const documentation = getDocumnetationFromElements(word);
            if (documentation !== undefined) { return documentation; }
            break;
        }
    }
    // Type is not defined
    // Try to get the documentation from attributs
    const documentation = getDocumentationFromAttributs(word);
    if (documentation !== undefined) { return documentation; }
    // Try to get the documentation from elements
    return getDocumnetationFromElements(word);
}

/**
 * Get documentation from elements
 * @param word 
 */
function getDocumentationFromAttributs(word: string): string | undefined {
    const definition = fitbitDefinitions.attributs.find(c => c.label.toLowerCase() === word);
    if (definition === undefined) { return undefined; }
    return definition.documentation;
}

/**
 * Get documentation from elements
 * @param word 
 */
function getDocumnetationFromElements(word: string): string | undefined {
    const definition = fitbitDefinitions.elements.find(c => c.label.toLowerCase() === word);
    if (definition === undefined) { return undefined; }
    return definition.documentation;
}