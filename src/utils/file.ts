import { modules } from '../utils';
import { GlobbyOption } from '../types';

export class File {
	files: string[];
	option: GlobbyOption;

	constructor(option?: GlobbyOption) {
		this.files = [];
		this.option = Object.assign({ ignore: ["node_modules", "*.git"], cwd: '', extensions: ["*.jsx", "*.ts", "*.mjs", ".php", ".java", "*.json"], dot: false, onlyFiles: true, absolute: true }, { ...option });
	}

	async getFiles(): Promise<string[]> {
		return await modules.globby('', this.option);
	}
}