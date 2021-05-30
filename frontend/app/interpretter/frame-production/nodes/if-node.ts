import { Production } from "knowledge-shell/models";
import Node from "./node";

export default class IfNode extends Node {
	protected question!: Node;

	protected trueExpression!: Node;

	protected falseExpression?: Node;

	constructor(question: Node, trueExpression: Node, falseExpression: Node | undefined, production: Production) {
		super(production);
		this.question = question;
		this.trueExpression = trueExpression;
		this.falseExpression = falseExpression;
	}

	public evaluate(): any {
		const result = this.question.evaluate() as boolean;
		if (result) {
			return this.trueExpression.evaluate();
		}

		return this.falseExpression?.evaluate();
	}
}
