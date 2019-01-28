import { workspace, window } from "vscode";
import * as globby from "globby";
import * as slash from "slash";
import { GlobbyOption } from "../types";
import { errorMessage } from "./message";

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

  async openAndShowDoc(file: string): Promise<any> {
    try {
      const doc = await workspace.openTextDocument(file);
      return await window.showTextDocument(doc);
    } catch (error) {
      return error;
    }
  }

  async openAllFiles(files: string[]): Promise<any> {
    try {
      await Promise.all(
        files.map(async file => await this.openAndShowDoc(file))
      );
    } catch (error) {
      return errorMessage(error);
    }
  }

  get currentFile() {
    const currentFile = window.activeTextEditor;
    if (currentFile == null) {
      return;
    }
    return currentFile.document.fileName.replace(workspace.rootPath + "/", "");
  }

  nextFile(files, currentFile): string {
    const index = files.indexOf(slash(currentFile));
    const newIndex = files.length === index ? 0 : index + 1;
    return files[newIndex];
  }

  async selectFile(file: string): Promise<any> {
    const currentFile = window.activeTextEditor;
    if (currentFile == null) {
      return;
    }
    return await this.openAndShowDoc(file);
  }
}
