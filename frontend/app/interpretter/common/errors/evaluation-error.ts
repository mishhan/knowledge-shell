export default class EvaluationError extends Error {
	constructor(nodeName: string, message: string) {
		super(`EvaluationError: [${nodeName}] - ${message}`);
	}
}
