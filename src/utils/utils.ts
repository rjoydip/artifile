import { Uri, workspace, window } from "vscode";
import { FileQuickData } from "../types";

export function openFile(path: string) {
  if (path == window.activeTextEditor.document.fileName) {
    window.showInformationMessage("Target is current file.");
    return;
  }
  workspace
    .openTextDocument(path)
    .then(txtDocument => window.showTextDocument(txtDocument));
}

export function getFileName(path: string): string {
  return path.substring(path.lastIndexOf("/") + 1);
}

export function getFileQuickPickItem(uri: Uri): FileQuickData {
  let path = uri.path;
  return {
    detail: workspace.asRelativePath(path),
    label: getFileName(path),
    path: path
  };
}

export const showFileQuickPick = async (
  uries: FileQuickData[]
): Promise<any> => {
  const file = await window.showQuickPick(uries, { matchOnDetail: true });

  if (file && file.path) await openFile(file.path);
};
