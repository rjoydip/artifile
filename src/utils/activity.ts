import { workspace, window } from "vscode";

export class Activity {
  openFileIndex: number;

  constructor(protected files: string[] = []) {
    this.openFileIndex = 0;
  }

  async openAllFiles() {
    try {
      await this.files.forEach(async file => {
        const doc = await workspace.openTextDocument(file);
        await window.showTextDocument(doc);
      });
    } catch (error) {}
  }
}
