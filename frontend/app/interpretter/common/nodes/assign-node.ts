import Node from "./node";
import BinarNode from "./binar-node";

export default class AssignNode extends BinarNode {
	constructor(leftNode: Node, rightNode: Node) {
		super(leftNode, rightNode, "AssignNode");
	}

	public evaluate(): any {
		const leftNodeValue = this.leftNode.evaluate();
		const rightNodeValue = this.rightNode.evaluate();

		if (leftNodeValue == null || rightNodeValue == null) {
			return null;
		}

		leftNodeValue.value = leftNodeValue.domain.getDomainValue(rightNodeValue.valueStr);
		return rightNodeValue;
	}
}
