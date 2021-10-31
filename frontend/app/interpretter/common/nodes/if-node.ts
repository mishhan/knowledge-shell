import { EvaluationError } from "../errors";
import Node from "./node";

export default class IfNode extends Node {
	protected readonly question: Node;
	protected readonly trueExpression: Node;
	protected readonly falseExpression?: Node;

	constructor(question: Node, trueExpression: Node, falseExpression: Node | undefined, nodeName = "IfNode") {
		super(nodeName);
		this.question = question;
		this.trueExpression = trueExpression;
		this.falseExpression = falseExpression;
	}

	public evaluate(): any {
		const isQuestionTrue = this.question.evaluate() as boolean;
		if (isQuestionTrue) {
			const trueResult = this.trueExpression.evaluate();
			return trueResult;
		}

		if (this.falseExpression) {
			const falseResult = this.falseExpression.evaluate();
			return falseResult;
		}

		throw new EvaluationError(this.nodeName, "{falseExpression} not defined");
	}
}
