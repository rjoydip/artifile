import { window, workspace } from "vscode";
import { Path, File, Activity } from '../utils';

export const activeAFA = async () => {
	const _path = new Path();
	_path.rootPath = workspace.rootPath;
	const _file = new File({ cwd: _path.rootPath });
	const files = await _file.getFiles();
	const _activity = new Activity(files);
	_activity.start();
	await window.showInformationMessage('Active Automated File Activity!');
}