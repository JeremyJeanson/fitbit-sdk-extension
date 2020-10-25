import { CompletionItem, CompletionItemKind, InsertTextFormat, MarkupKind, Range, TextDocumentPositionParams } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { FitbitElementType, fitbitDefinitions, IFitbitAttributDefinition, IFitbitElementDefinition } from "./fitbit-svg-definitions";

interface IAnalyseResult {
    /**
     * The word that the user is typing
     */
    currentWord?: string;

    /**
     * The current word was started with a "<" 
     */
    currentWordHasMark: boolean;

    /**
     * The current word is attached to an existing markup
     */
    parent?: string;

    /**
     * The analyse is not finished. It need data from previous lines
     */
    needMoreAnalyse: boolean;
}

/**
 * Chars to avoid un key words
 */
const sanitateChars = ["\n", "\r", "\t"];

/**
 * Completion is requested
 * @param params 
 */
export function oncompletion(document: TextDocument, params: TextDocumentPositionParams): CompletionItem[] {
    // Analyse the curretn posistion
    const analyse = analysePosition(document, params);

    // No data -> return all
    if (analyse === undefined) { return getCompletionItemsForAnElement(fitbitDefinitions.elements, false); }

    // Parent markup found -> return arguments
    if (analyse.parent !== undefined) {
        const attributs = filterAttributes(analyse.parent, analyse.currentWord);
        return getCompletionItemsForAnAttribut(attributs);
    }

    // No parent -> return all exepted arguments
    // No word -> return all
    if (analyse.currentWord === undefined) {
        return getCompletionItemsForAnElement(
            fitbitDefinitions.elements,
            analyse.currentWordHasMark);
    }
    const word = analyse.currentWord;
    return getCompletionItemsForAnElement(
        fitbitDefinitions.elements.filter(c => c.label.toLowerCase().startsWith(word)),
        analyse.currentWordHasMark);
}

/**
 * Filter attributes for an element
 * @param elementName 
 * @param currentWord 
 */
function filterAttributes(elementName: string, currentWord: string | undefined): IFitbitAttributDefinition[] {
    // Get element
    const element = fitbitDefinitions.elements.find(c => c.label.toLowerCase() === elementName);
    if (element === undefined || element.attributs.length === 0) { return []; }

    // Set the types to filter
    const types = element.attributs;

    return currentWord === undefined
        // Filter attributs on types
        ? fitbitDefinitions.attributs.filter(c => types.findIndex(cc => cc === c.type) >= 0)
        // Filter attributs on types and word
        : fitbitDefinitions.attributs.filter(c => types.findIndex(cc => cc === c.type) >= 0 && c.label.toLowerCase().startsWith(currentWord));
}

/**
 * Analyse text from the gieven position
 * @param params 
 */
function analysePosition(document: TextDocument, params: TextDocumentPositionParams): IAnalyseResult | undefined {
    if (document === undefined) { return undefined; }
    let currentWord: string | undefined;
    // Alalyse from the current line (to the firt if requested)
    for (let i = params.position.line; i >= 0; i--) {
        const isCurrentline = i === params.position.line;
        // Read the line
        const line =
            document.getText(Range.create(
                i, 0,
                i, isCurrentline ? params.position.character : Number.MAX_VALUE));
        // Analyse the line
        const analyse = analyseLine(line);

        if (analyse.needMoreAnalyse) {
            // Memorise the nanalyse onn ly if it the current line
            // Else we don't need this anlayse, it has noting to keep
            if (isCurrentline) { currentWord = analyse.currentWord; }
        } else {
            // Test if it is the current line
            if (isCurrentline) { return analyse; }
            else {
                // Check if parent wqs found
                if (analyse.currentWordHasMark) {
                    // Get the parent
                    if (analyse.currentWord !== undefined) { analyse.parent = analyse.currentWord; }
                    // The current word cannont have mark because this analyse come from a previous line
                    analyse.currentWordHasMark = false;
                }
                // Combine data with the firt analyse
                analyse.currentWord = currentWord;
            }
            return analyse;
        }
    }
    return undefined;
}

function analyseLine(line: string): IAnalyseResult {
    // check the line lenght
    if (line.length === 0) {
        return {
            currentWordHasMark: false,
            needMoreAnalyse: true
        };
    }
    // Frist word found on the line
    let firstWord: string | undefined;
    // A first space was found (don't try to find the current word)
    let spaceFound = false;
    // Check each chars
    for (let i = line.length - 1; i >= 0; i--) {
        // Test each chars to know the situation
        switch (line[i]) {
            case " ": {
                // Take care only of the first space found
                if (!spaceFound) {
                    spaceFound = true;
                    // Try to get a word
                    const word = getFirstWord(line, i);
                    // Set the first word if possible
                    if (word !== undefined) { firstWord = word; }
                }
                break;
            }
            case "<": {
                if (firstWord === undefined) {
                    if (spaceFound) {
                        return {
                            currentWordHasMark: false,
                            needMoreAnalyse: false,
                            parent: getFirstWord(line, i + 1)
                        };
                    }
                    return {
                        currentWordHasMark: true,
                        currentWord: getFirstWord(line, i + 1),
                        needMoreAnalyse: false
                    };
                }
                return {
                    currentWordHasMark: false,
                    currentWord: firstWord,
                    parent: getFirstWord(line, i + 1),
                    needMoreAnalyse: false
                };
            }
            case ">": {
                if (firstWord === undefined) {
                    return {
                        currentWordHasMark: false,
                        needMoreAnalyse: false
                    };
                }
                return {
                    currentWordHasMark: false,
                    needMoreAnalyse: false,
                    currentWord: firstWord
                };
            }
        }
    }
    // Return only the current word
    return {
        currentWordHasMark: false,
        needMoreAnalyse: true,
        currentWord: firstWord
    };
}

/**
 * Get the first word found in the given line
 */
function getFirstWord(line: string, index: number): string | undefined {
    // Check the index
    if (line.length <= index) { return undefined; }
    // Get sub line from the index
    const subline = line.substring(index).trim();
    if (subline.length === 0) { return undefined; }

    // Test if it contain spaces
    const spaceIndex = subline.indexOf(" ");
    // No space
    if (spaceIndex < 0) { return sanitateWord(subline); }

    // Search the first word
    const words = subline.split(" ");
    // Return the first word
    return sanitateWord(words[0]);
}

/**
 * Remove spacial chars from the givent key word
 * @param word 
 */
function sanitateWord(word: string): string {
    for (let i = sanitateChars.length - 1; i >= 0; i--) {
        if (word.indexOf(sanitateChars[i]) >= 0) { word = word.replace(sanitateChars[i], ""); }
    }
    return word.toLowerCase();
}

/**
 * Translate definitions to completion items
 * @param definitionsFiltered 
 */
function getCompletionItemsForAnElement(definitionsFiltered: IFitbitElementDefinition[], currentWordHasMark: boolean): CompletionItem[] {
    const result: CompletionItem[] = [];
    for (let i = 0; i < definitionsFiltered.length; i++) {
        result.push(getCompletionItemForAnElement(definitionsFiltered[i], currentWordHasMark));
    }
    return result;
}

/**
 * Translate definition to completion item
 * @param definition 
 * @param currentWordHasMark 
 */
function getCompletionItemForAnElement(definition: IFitbitElementDefinition, currentWordHasMark: boolean): CompletionItem {
    // Index of the data
    const data = fitbitDefinitions.elements.indexOf(definition);
    let insertText: string;

    switch (definition.special) {
        // Container
        case FitbitElementType.Container: {
            // Format the text to insert
            insertText = definition.insertText
                ? `${definition.label} ${definition.insertText}>\n\t$0\n</${definition.label}>`
                : `${definition.label}>\n\t$0\n</${definition.label}>`;

            break;
        }
        // Text from insdert
        case FitbitElementType.Misc: {
            // Format the text to insert
            insertText = definition.insertText
                ? definition.insertText
                : definition.label;
            break;
        }
        // Simple Element
        default: {
            // Format the text to insert
            insertText = definition.insertText
                ? `${definition.label} ${definition.insertText}$0 />`
                : `${definition.label}$0 />`;
        }
    }

    // Add "<" if it is missing
    if (!currentWordHasMark) { insertText = "<" + insertText; }
    return {
        data: data,
        label: definition.label,
        insertText: insertText,
        insertTextFormat: InsertTextFormat.Snippet,
        kind: CompletionItemKind.Module,
    };
}

/**
 * Translate definitions to completion items
 * @param definitionsFiltered 
 */
function getCompletionItemsForAnAttribut(definitionsFiltered: IFitbitAttributDefinition[]): CompletionItem[] {
    if (definitionsFiltered.length === 0) { return []; }
    const result: CompletionItem[] = [];
    for (let i = 0; i < definitionsFiltered.length; i++) {
        result.push(getCompletionItemForAnAttribut(definitionsFiltered[i]));
    }
    return result;
}

/**
 * Translate definition to completion item
 * @param definition 
 * @param currentWordHasMark 
 */
function getCompletionItemForAnAttribut(definition: IFitbitAttributDefinition): CompletionItem {
    // Index of the data
    const data = fitbitDefinitions.attributs.indexOf(definition);

    // Attribut
    return {
        data: data,
        label: definition.label,
        insertText:
            // Check if a snippet is avaiable
            definition.insertText
                ? definition.insertText
                : `${definition.label}="$1"`,
        insertTextFormat: InsertTextFormat.Snippet,
        kind: CompletionItemKind.Property,
    };
}
/**
 * Completion need more informations
 * @param e 
 */
export function onCompletionResolve(e: CompletionItem): CompletionItem {
    // Check the id
    if (e.data === undefined) { return e; }
    // Try to get more data from definitions
    const definition = e.kind === CompletionItemKind.Property
        ? fitbitDefinitions.attributs[e.data]
        : fitbitDefinitions.elements[e.data];
    // Check the definition
    if (definition === undefined) { return e; }
    // Add more data from the definition
    e.detail = definition.detail;
    e.documentation = {
        kind: MarkupKind.Markdown,
        value: definition.documentation
    };
    return e;
}