import { CompletionItem, CompletionItemKind, InsertTextFormat, MarkupKind, Range, TextDocumentPositionParams } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { fitbitDefinitions, FitbitSvgType, IFitbitDefinition } from "./fitbit-svg-definitions";

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
    markupName?: string;

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
    if (analyse === undefined) return getCompletionItem(fitbitDefinitions, false);

    // Parent markup found -> return arguments
    if (analyse.markupName !== undefined) {
        // No word -> return all
        if (analyse.currentWord === undefined) {
            return getCompletionItem(
                fitbitDefinitions.filter(c => c.type === FitbitSvgType.Attribut),
                false);
        }
        const word = analyse.currentWord;
        return getCompletionItem(
            fitbitDefinitions.filter(c => c.type === FitbitSvgType.Attribut && c.label.startsWith(word)),
            false);
    }

    // No parent -> return all exepted arguments
    // No word -> return all
    if (analyse.currentWord === undefined) {
        return getCompletionItem(
            fitbitDefinitions.filter(c => c.type !== FitbitSvgType.Attribut),
            analyse.currentWordHasMark);
    }
    const word = analyse.currentWord;
    return getCompletionItem(
        fitbitDefinitions.filter(c => c.type !== FitbitSvgType.Attribut && c.label.startsWith(word)),
        analyse.currentWordHasMark);
}

/**
 * Analyse text from the gieven position
 * @param params 
 */
function analysePosition(document: TextDocument, params: TextDocumentPositionParams): IAnalyseResult | undefined {
    if (document === undefined) return undefined;
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
        if (analyse !== undefined) {
            if (analyse.needMoreAnalyse) {
                // Memorise the nanalyse onn ly if it the current line
                // Else we don't need this anlayse, it has noting to keep
                if (isCurrentline) currentWord = analyse.currentWord;
            } else {
                // Test if it is the current line
                if (isCurrentline) return analyse;
                // Test if the current line has data
                if (currentWord !== undefined) {
                    // Combine data with the firt analyse if it exists
                    analyse.currentWord = currentWord;
                    // The current word cannont have mark because this analyse come from a previous line
                    analyse.currentWordHasMark = false;
                }
                return analyse;
            }
        }
    }
    return undefined;
}

function analyseLine(line: string): IAnalyseResult | undefined {
    // check the line lenght
    if (line.length === 0) return undefined;
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
                    if (word !== undefined) firstWord = word;
                }
                break;
            }
            case "<": {
                if (firstWord === undefined) {
                    if (spaceFound) {
                        return {
                            currentWordHasMark: false,
                            needMoreAnalyse: false,
                            markupName: getFirstWord(line, i + 1)
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
                    markupName: getFirstWord(line, i + 1),
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
}

/**
 * Get the first word found in the given line
 */
function getFirstWord(line: string, index: number): string | undefined {
    // Check the index
    if (line.length <= index) return undefined;
    // Get sub line from the index
    const subline = line.substring(index).trim();
    if (subline.length === 0) return undefined;

    // Test if it contain spaces
    const spaceIndex = subline.indexOf(" ");
    // No space
    if (spaceIndex < 0) return sanitateWord(subline);

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
        if (word.indexOf(sanitateChars[i]) >= 0) word = word.replace(sanitateChars[i], "");
    }
    return word.toLowerCase();
}

/**
 * Translate definitions to completion items
 * @param definitionsFiltered 
 */
function getCompletionItem(definitionsFiltered: IFitbitDefinition[], currentWordHasMark: boolean): CompletionItem[] {
    const result: CompletionItem[] = [];
    for (let i = 0; i < definitionsFiltered.length; i++) {
        if (definitionsFiltered[i].type === FitbitSvgType.Container) {
            // Format the text to insert
            let insertText = `${definitionsFiltered[i].label}>\n\t$1\n</${definitionsFiltered[i].label}>`;
            // Add "<" if it is missing
            if (!currentWordHasMark) insertText = "<" + insertText;
            result.push({
                data: fitbitDefinitions.indexOf(definitionsFiltered[i]),
                label: definitionsFiltered[i].label,
                insertText: insertText,
                insertTextFormat: InsertTextFormat.Snippet,
                kind: CompletionItemKind.Module,
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
 * @param e 
 */
export function onCompletionResolve(e: CompletionItem): CompletionItem {
    // Check the id
    if (e.data === undefined) return e;
    // Try to get more data from definitions
    const definition = fitbitDefinitions[e.data];
    // Check the definition
    if (definition == undefined) return e;
    // Add more data from the definition
    e.detail = definition.detail;
    if (definition.documentation) {
        e.documentation = {
            kind: MarkupKind.Markdown,
            value: definition.documentation
        };
    }
    return e;
}