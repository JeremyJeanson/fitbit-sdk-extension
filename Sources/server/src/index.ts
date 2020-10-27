import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    CompletionItem,
    TextDocumentPositionParams,
    TextDocumentSyncKind,
    InitializeResult,
    HoverParams,
    Hover
} from "vscode-languageserver";

import {
    TextDocument
} from "vscode-languageserver-textdocument";

import * as fitbitCompletion from "./fitbit-svg-completion";
import * as fitbitHover from "./fitbit-svg-hover";
import * as fitbitFormat from "./fitbit-svg-format";
import * as fitbitColors from "./fitbit-svg-colors";

// Create a connection for the server, using Node"s IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. 
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize(() => {
    const result: InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            // Tell the client that this server supports code completion.
            completionProvider: {
                resolveProvider: true
            },
            // Tell the client that this server supports hover documentatin.
            hoverProvider: true,
            // Tell the clieny that this server supprots code formatting
            documentFormattingProvider: true,
            documentRangeFormattingProvider: true,
            // Tell the clieny that this server supprots colors edition
            colorProvider: true
        }
    };

    return result;
});

documents.onDidChangeContent(() => {
    //fitbitCompletion.setDocument(change.document);
});

/**
 * Code completion
 */
connection.onCompletion(
    (e: TextDocumentPositionParams): CompletionItem[] => {
        try {
            // Get the current document
            const document = documents.get(e.textDocument.uri);
            if (document === undefined) { return []; }
            // Get the completion response
            return fitbitCompletion.oncompletion(document, e);
        }
        catch (ex) {
            console.error("Fitbit-sdk-extension Server error :\n" + ex);
            return [];
        }
    }
);

/**
 * Code compltion documentation
 */
connection.onCompletionResolve(
    (e: CompletionItem): CompletionItem => {
        try {
            return fitbitCompletion.onCompletionResolve(e);
        }
        catch (ex) {
            console.error("Fitbit-sdk-extension Server error :\n" + ex);
            return e;
        }
    }
);

/**
 * Documentation when hover
 */
connection.onHover(
    (e: HoverParams): Hover | undefined => {
        // Get the current document
        const document = documents.get(e.textDocument.uri);
        if (document === undefined) { return undefined; }
        // Get the hover reponse
        return fitbitHover.onHover(document, e);
    });

/**
 * Format the document
 */
connection.onDocumentFormatting(e => {
    // Get the current document
    const document = documents.get(e.textDocument.uri);
    if (document === undefined) { return undefined; }
    // Format
    return fitbitFormat.onDocumentFormatting(document, e);
});

/**
 * Format the range
 */
connection.onDocumentRangeFormatting(e => {
    // Get the current document
    const document = documents.get(e.textDocument.uri);
    if (document === undefined) { return undefined; }
    // Format
    return fitbitFormat.onDocumentRangeFormatting(document, e);
});

/**
 * Add colors
 */
connection.onDocumentColor(e => {
    // Get the current document
    const document = documents.get(e.textDocument.uri);
    if (document === undefined) { return undefined; }
    // Mark colors attributs
    return fitbitColors.onDocumentColor(document);
});

/**
 * User edited a color -> return the fitbit color or the hexa value
 */
connection.onColorPresentation((e) => {
    return fitbitColors.onColorPresentation(e.color);
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();