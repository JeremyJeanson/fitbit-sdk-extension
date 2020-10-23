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
            hoverProvider: true
        }
    };

    return result;
});

documents.onDidChangeContent(() => {
    //fitbitCompletion.setDocument(change.document);
});

// This handler provides the initial list of the completion items.
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

// This handler resolves additional information for the item selected in
// the completion list.
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

connection.onHover(
    (e: HoverParams): Hover | undefined => {
        // Get the current document
        const document = documents.get(e.textDocument.uri);
        if (document === undefined) { return undefined; }
        // Get the hover reponse
        return fitbitHover.onHover(document, e);
    });

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();