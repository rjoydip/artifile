import { commands, ExtensionContext } from 'vscode';
import { activeAFA } from "./commands";

export function activate(context: ExtensionContext) {
	const disposable = commands.registerCommand('extension.afa.active', activeAFA);
	context.subscriptions.push(disposable);
}

export function deactivate() {}
