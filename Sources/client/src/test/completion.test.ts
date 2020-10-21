import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate } from './helper';

suite('Should do completion', () => {
	const emptyDoc = getDocUri('empty.view');
	const widgetDoc = getDocUri('widget.defs');
	const indexDoc = getDocUri('index.view');

	test('Completes SVG Emtpy', async () => {
		await testCompletion(emptyDoc, new vscode.Position(0, 0), {
			items: [
				{ label: 'animate', kind: vscode.CompletionItemKind.Module },
				{ label: 'animateTransform', kind: vscode.CompletionItemKind.Module }
			]
		});
	});

	test('Completes Widget Defs', async () => {
		await testCompletion(widgetDoc, new vscode.Position(0, 2), {
			items: [
				{ label: 'section', kind: vscode.CompletionItemKind.Module },
			]
		});
	});

	test('Completes Widget Defs', async () => {
		await testCompletion(widgetDoc, new vscode.Position(0, 3), {
			items: [
				{ label: 'svg', kind: vscode.CompletionItemKind.Module },
			]
		});
	});

	test('Completes Image', async () => {
		await testCompletion(indexDoc, new vscode.Position(1, 11), {
			items: [
				{ label: 'class', kind: vscode.CompletionItemKind.Property },
				{ label: 'display', kind: vscode.CompletionItemKind.Property },
				{ label: 'fill', kind: vscode.CompletionItemKind.Property },
				{ label: 'height', kind: vscode.CompletionItemKind.Property },
				{ label: 'href', kind: vscode.CompletionItemKind.Property },
				{ label: 'id', kind: vscode.CompletionItemKind.Property },
				{ label: 'opacity', kind: vscode.CompletionItemKind.Property },
				{ label: 'pointer-events', kind: vscode.CompletionItemKind.Property },
				{ label: 'viewport-fill', kind: vscode.CompletionItemKind.Property },
				{ label: 'visibility', kind: vscode.CompletionItemKind.Property },
				{ label: 'width', kind: vscode.CompletionItemKind.Property },
				{ label: 'x', kind: vscode.CompletionItemKind.Property },
				{ label: 'y', kind: vscode.CompletionItemKind.Property },
			]
		});
	});
});

async function testCompletion(
	docUri: vscode.Uri,
	position: vscode.Position,
	expectedCompletionList: vscode.CompletionList
) {
	await activate(docUri);

	// Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
	const actualCompletionList = (await vscode.commands.executeCommand(
		'vscode.executeCompletionItemProvider',
		docUri,
		position
	)) as vscode.CompletionList;

	assert.ok(actualCompletionList.items.length >= expectedCompletionList.items.length);
	expectedCompletionList.items.forEach((expectedItem, i) => {
		const actualItem = actualCompletionList.items[i];
		assert.equal(actualItem.label, expectedItem.label);
		assert.equal(actualItem.kind, expectedItem.kind);
	});
}
