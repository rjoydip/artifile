import { workspace } from "vscode";
import { Path, File } from '../utils';

export const activeAFA = async () => {
	const _path = new Path();
	_path.rootPath = workspace.rootPath;
	const _file = new File({ cwd: _path.rootPath });
	const files = await _file.getFiles();
	await _file.openAllFiles(files);
	const currentFile = await _file.currentFile;
	const nextFile = await _file.nextFile(files, currentFile);
	await _file.selectFile(nextFile);
}