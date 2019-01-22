
export class Path {
	private _rootPath: string;

	constructor() {
		this._rootPath = '';
	}
	
	set rootPath(path: string) {
		this._rootPath = path;
	}

	get rootPath(): string {
		return this._rootPath;
	}
}