export interface GlobbyOption {
	ignore?: string[];
	dot?: boolean;
	cwd?: string;
	extensions?: string[];
	absolute?: boolean;
	onlyFiles?: boolean;
}

export interface FileQuickData {
	detail: string;
	label: string;
	path: string;
}