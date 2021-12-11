import Node from "./node";
import BinarNode from "./binar-node";
import { ValueType } from "../node-value";
import { EvaluationError } from "../errors";

export default class LessEqualNode extends BinarNode {
	constructor(leftNode: Node, rightNode: Node) {
		super(leftNode, rightNode, "LessEqualNode");
	}

	public evaluate(): boolean {
		const leftNodeValue = this.getLeftNodeValue();
		const rightNodeValue = this.getRightNodeValue();

		const isBothNumber = leftNodeValue.Type === ValueType.Number && rightNodeValue.Type === ValueType.Number;
		if (isBothNumber) {
			return leftNodeValue.Value <= rightNodeValue.Value;
		}

		throw new EvaluationError(
			this.nodeName,
			"{leftNodeValue} and {rightNodeValue} must have type DomainValueNumber | number",
		);
	}
}
