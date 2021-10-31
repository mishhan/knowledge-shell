import { DomainValue, DomainValueNumber, DomainValueString } from "knowledge-shell/models";
import Node from "./node";
import BinarNode from "./binar-node";
import { ValueType } from "../node-value";
import { EvaluationError } from "../errors";

export default class PlusNode extends BinarNode {
	constructor(leftNode: Node, rightNode: Node) {
		super(leftNode, rightNode, "PlusNode");
	}

	public evaluate(): number | string | DomainValue {
		const leftNodeValue = this.getLeftNodeValue();
		const rightNodeValue = this.getRightNodeValue();

		const isBothNumber = leftNodeValue.Type === ValueType.Number && rightNodeValue.Type === ValueType.Number;
		const isBothString = leftNodeValue.Type === ValueType.String && rightNodeValue.Type === ValueType.String;
		const isLeftStringRightNumber = leftNodeValue.Type === ValueType.String && rightNodeValue.Type === ValueType.Number;

		if (isBothNumber) {
			const resultValue = leftNodeValue.Value + rightNodeValue.Value;
			const isLeftNodeRangeValue = leftNodeValue.NodeValue instanceof DomainValueNumber;
			if (isLeftNodeRangeValue) {
				const rangeValue = (leftNodeValue.NodeValue as DomainValueNumber).domain.getDomainValue(resultValue);
				return rangeValue;
			}

			return resultValue;
		}

		if (isBothString) {
			const resultValue = leftNodeValue.Value + rightNodeValue.Value;
			const isLeftNodeRangeValue = leftNodeValue.NodeValue instanceof DomainValueString;
			if (isLeftNodeRangeValue) {
				const rangeValue = (leftNodeValue.NodeValue as DomainValueString).domain.getDomainValue(resultValue);
				return rangeValue;
			}

			return resultValue;
		}

		if (isLeftStringRightNumber) {
			const resultValue = leftNodeValue.Value + rightNodeValue.Value;
			const isLeftNodeRangeValue = leftNodeValue.NodeValue instanceof DomainValueString;
			if (isLeftNodeRangeValue) {
				const rangeValue = (leftNodeValue.NodeValue as DomainValueString).domain.getDomainValue(resultValue);
				return rangeValue;
			}

			return resultValue;
		}

		throw new EvaluationError(
			this.nodeName,
			"{leftNodeValue} and {rightNodeValue} must have same type (DomainValueNumber | number) or (DomainValueString | string | number)",
		);
	}
}
