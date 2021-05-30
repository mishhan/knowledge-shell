import { DomainValueNumber, DomainValueString } from "knowledge-shell/models";
import { InterpretationException } from "../exceptions";
import BinarNode from "./binar-node";

export default class PlusNode extends BinarNode {
	evaluate(): any {
		const leftNodeValue = this.leftNode.evaluateR();
		const rightNodeValue = this.rightNode.evaluateR();

		if (this.isNumberNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
			const leftNodeValueNumber = this.getNodeValueNumber(leftNodeValue);
			const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
			const nodeValueNumber = leftNodeValueNumber + rightNodeValueNumber;
			if (leftNodeValue instanceof DomainValueNumber) {
				const nodeValue = leftNodeValue.domain.getDomainValue(nodeValueNumber);
				return nodeValue;
			}

			return nodeValueNumber;
		}

		if (this.isStringNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
			const leftNodeValueString = this.getNodeValueString(leftNodeValue);
			const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
			const nodeValueString = leftNodeValueString + rightNodeValueNumber;
			if (leftNodeValue instanceof DomainValueString) {
				const nodeValue = leftNodeValue.domain.getDomainValue(nodeValueString);
				return nodeValue;
			}

			return nodeValueString;
		}

		if (this.isStringNode(leftNodeValue) && this.isStringNode(rightNodeValue)) {
			const leftNodeValueString = this.getNodeValueString(leftNodeValue);
			const rightNodeValueString = this.getNodeValueString(rightNodeValue);
			const nodeValueString = leftNodeValueString + rightNodeValueString;
			if (leftNodeValue instanceof DomainValueString) {
				const nodeValue = leftNodeValue.domain.getDomainValue(nodeValueString);
				return nodeValue;
			}

			return nodeValueString;
		}

		throw new InterpretationException(
			this.constructor.name,
			`{leftNodeValue} and {rightNodeValue} must have same type (DomainValueNumber | number) or (DomainValueString | string | number)`,
		);
	}
}
