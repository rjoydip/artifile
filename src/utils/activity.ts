import {
  workspace, window,
} from "vscode";

export class Activity {
  openFileIndex: number;

  constructor(protected files: string[] = []) {
    this.openFileIndex = 0;
  }

  async openAllFiles() {
    const file = this.files[0];
    const doc = await workspace.openTextDocument(file);
    window.showTextDocument(doc);
  }
}
