import Node from "./node";
import BinarNode from "./binar-node";
import { ValueType } from "../node-value";
import { EvaluationError } from "../errors";

export default class OrNode extends BinarNode {
	constructor(leftNode: Node, rightNode: Node) {
		super(leftNode, rightNode, "OrNode");
	}

	public evaluate(): boolean {
		const leftNodeValue = this.getLeftNodeValue();
		const rightNodeValue = this.getRightNodeValue();

		const isBothBoolean = leftNodeValue.Type === ValueType.Boolean && rightNodeValue.Type === ValueType.Boolean;
		if (isBothBoolean) {
			const result = leftNodeValue.Value === true || rightNodeValue.Value === true;
			return result;
		}

		throw new EvaluationError(this.nodeName, "{leftNodeValue} and {rightNodeValue} must be boolean");
	}
}
