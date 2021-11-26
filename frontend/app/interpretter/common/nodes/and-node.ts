import Node from "./node";
import BinarNode from "./binar-node";
import { ValueType } from "../node-value";
import { EvaluationError } from "../errors";

export default class AndNode extends BinarNode {
	constructor(leftNode: Node, rightNode: Node) {
		super(leftNode, rightNode, "AndNode");
	}

	public evaluate(): boolean {
		const leftNodeValue = this.getLeftNodeValue();
		const rightNodeValue = this.getRightNodeValue();

		const isBothBoolean = leftNodeValue.Type === ValueType.Boolean && rightNodeValue.Type === ValueType.Boolean;
		if (isBothBoolean) {
			const result = (leftNodeValue.Value as boolean) && (rightNodeValue.Value as boolean);
			return result;
		}

		throw new EvaluationError(this.nodeName, "{leftNodeValue} and {rightNodeValue} must be boolean");
	}
}
