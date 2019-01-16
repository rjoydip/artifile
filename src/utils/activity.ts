import { resolve } from "path";
import {
  Uri,
} from "vscode";

import { showFileQuickPick, getFileQuickPickItem } from "./utils";
import { FileQuickData } from "../types";

export class Activity {
  openFileIndex: number;

  constructor(protected files: string[] = []) {
    this.openFileIndex = 0;
  }

  async start() {
    const files: FileQuickData[] = this.files.map(file => {
      const uri = Uri.parse(resolve(file));
      return getFileQuickPickItem(uri);
    });
    console.log(files);
    await showFileQuickPick(files);
  }
}
