import { window } from "vscode";

export function errorMessage(msg: string) {
	if (msg) {
		window.showErrorMessage(msg);
	}
}

export function informationMessage(msg: string) {
	if (msg) {
		window.showInformationMessage(msg);
	}
}

export function warningMessage(msg: string) {
	if (msg) {
		window.showWarningMessage(msg);
	}
}