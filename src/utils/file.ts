import { workspace, window } from "vscode";
import * as globby from 'globby';
import { GlobbyOption } from "../types";

export class File {
  files: string[];
  option: GlobbyOption;

  constructor(option?: GlobbyOption) {
    this.files = [];
    this.option = Object.assign(
      {
        ignore: ["node_modules", "*.git"],
        cwd: "",
        extensions: ["*.jsx", "*.ts", "*.mjs", ".php", ".java", "*.json"],
        dot: false,
        onlyFiles: true,
        absolute: true
      },
      { ...option }
    );
  }

  async getFiles(): Promise<string[]> {
    return await globby("", this.option);
  }

  async openAllFiles(files: string[]) {
    try {
      await files.forEach(async file => {
        const doc = await workspace.openTextDocument(file);
        await window.showTextDocument(doc);
      });
    } catch (error) {}
  }
}
