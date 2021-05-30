import { InterpretationException } from "../exceptions";
import BinarNode from "./binar-node";

export default class EqualNode extends BinarNode {
	public evaluate(): boolean {
		const leftNodeValue = this.leftNode.evaluateR();
		const rightNodeValue = this.rightNode.evaluateR();

		if (this.isNumberNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
			const leftNodeValueNumber = this.getNodeValueNumber(leftNodeValue);
			const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
			return leftNodeValueNumber === rightNodeValueNumber;
		}

		if (this.isStringNode(leftNodeValue) && this.isStringNode(rightNodeValue)) {
			const leftNodeValueString = this.getNodeValueString(leftNodeValue);
			const rightNodeValueString = this.getNodeValueString(rightNodeValue);
			return leftNodeValueString === rightNodeValueString;
		}

		/**
		 * in some situations it's possible that leftNodeValue or rightNodeValue is undefined
		 * for example: when we're trying to access non existing frame slot
		 * this['left']['health'] but this['left'] doesn't have ['health]
		 */
		if (leftNodeValue === undefined || rightNodeValue === undefined) {
			return false;
		}

		throw new InterpretationException(
			this.constructor.name,
			"{leftNodeValue} and {rightNodeValue} must have same type",
		);
	}
}
