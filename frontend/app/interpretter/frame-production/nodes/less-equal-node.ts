import { InterpretationException } from "../exceptions";
import BinarNode from "./binar-node";

export default class LessEqualNode extends BinarNode {
	public evaluate(): boolean {
		const leftNodeValue = this.leftNode.evaluateR();
		const rightNodeValue = this.rightNode.evaluateR();

		if (this.isNumberNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
			const leftNodeValueNumber = this.getNodeValueNumber(leftNodeValue);
			const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
			return leftNodeValueNumber <= rightNodeValueNumber;
		}

		throw new InterpretationException(
			this.constructor.name,
			`{leftNodeValue} and {rightNodeValue} must have type DomainValueNumber | number`,
		);
	}
}
