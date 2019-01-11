export interface GlobbyOption {
	ignore?: string[];
	dot?: boolean;
	cwd?: string;
	extensions?: string[];
	absolute?: boolean;
	onlyFiles?: boolean;
}
