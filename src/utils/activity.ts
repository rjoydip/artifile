export class Activity {
	constructor(
		protected files: string[] = []
	) { }

	start() {
		this.files.forEach(file => {
			console.log('file', file);
		});
	}
}