import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    CompletionItem,
    TextDocumentPositionParams,
    TextDocumentSyncKind,
    InitializeResult
} from "vscode-languageserver";

import {
    TextDocument
} from "vscode-languageserver-textdocument";

import * as fitbitCompletion from "./fitbit-svg-completion";

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
            }
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
            const uri = e.textDocument.uri;
            const document = documents.get(uri);
            if (document === undefined) { return []; }
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

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();