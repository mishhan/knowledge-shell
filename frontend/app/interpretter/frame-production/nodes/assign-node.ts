import BinarNode from "./binar-node";

export default class AssignNode extends BinarNode {
	public evaluate(): any {
		const leftNodeValue = this.leftNode.evaluate();
		const rightNodeValue = this.rightNode.evaluate();

		if (leftNodeValue == null || rightNodeValue == null) {
			return null;
		}

		leftNodeValue.value = leftNodeValue.domain.getDomainValueStringByName(rightNodeValue.valueStr);
		return rightNodeValue;
	}
}
