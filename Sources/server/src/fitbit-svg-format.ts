// Use the HTML language service to format the SVG
import { TextDocument } from "vscode-languageserver-textdocument";
import { DocumentFormattingParams, DocumentRangeFormattingParams, TextEdit } from "vscode-languageserver";
import { getLanguageService } from 'vscode-html-languageservice';

const _htmlLanguageService = getLanguageService();

/**
 * Format the document
 * @param document 
 * @param params 
 */
export function onDocumentFormatting(document: TextDocument, params: DocumentFormattingParams): TextEdit[] {
    // Use the HTML service to format the document
    return _htmlLanguageService.format(document, undefined, params.options);
}

/**
 * Format the range
 * @param document 
 * @param params 
 */
export function onDocumentRangeFormatting(document: TextDocument, params: DocumentRangeFormattingParams): TextEdit[] {
    // Use the HTML service to format the range
    return _htmlLanguageService.format(document, params.range, params.options);
}