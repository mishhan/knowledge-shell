import { DomainValueNumber } from "knowledge-shell/models";
import { InterpretationException } from "../exceptions";
import BinarNode from "./binar-node";

export default class MinusNode extends BinarNode {
	public evaluate(): any {
		const leftNodeValue = this.leftNode.evaluateR();
		const rightNodeValue = this.rightNode.evaluateR();

		if (this.isNumberNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
			const leftNodeValueNumber = this.getNodeValueNumber(leftNodeValue);
			const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
			const nodeValueNumber = leftNodeValueNumber - rightNodeValueNumber;
			if (leftNodeValue instanceof DomainValueNumber) {
				const nodeValue = leftNodeValue.domain.getDomainValue(nodeValueNumber);
				return nodeValue;
			}

			return nodeValueNumber;
		}

		throw new InterpretationException(
			this.constructor.name,
			`{leftNodeValue} and {rightNodeValue} must have type DomainValueNumber | number`,
		);
	}
}
