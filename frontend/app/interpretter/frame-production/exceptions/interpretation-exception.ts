export default class InterpretationException extends Error {
	public nodeName!: string;

	constructor(nodeName: string, message?: string) {
		const errorMessage = `InterpretationException! [${nodeName}]: ${message}`;
		super(errorMessage);
		this.nodeName = nodeName;
	}
}
