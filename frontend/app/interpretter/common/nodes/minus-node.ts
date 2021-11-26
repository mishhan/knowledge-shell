import { DomainValue, DomainValueNumber } from "knowledge-shell/models";
import Node from "./node";
import BinarNode from "./binar-node";
import { ValueType } from "../node-value";
import { EvaluationError } from "../errors";

export default class MinusNode extends BinarNode {
	constructor(leftNode: Node, rightNode: Node) {
		super(leftNode, rightNode, "MinusNode");
	}

	public evaluate(): number | DomainValue {
		const leftNodeValue = this.getLeftNodeValue();
		const rightNodeValue = this.getRightNodeValue();

		const isBothNumber = leftNodeValue.Type === ValueType.Number && rightNodeValue.Type === ValueType.Number;

		if (isBothNumber) {
			const resultValue = (leftNodeValue.Value as number) - (rightNodeValue.Value as number);
			const isLeftNodeRangeValue = leftNodeValue.NodeValue instanceof DomainValueNumber;
			if (isLeftNodeRangeValue) {
				const rangeValue = (leftNodeValue.NodeValue as DomainValueNumber).domain.getDomainValue(resultValue);
				return rangeValue;
			}

			return resultValue;
		}

		throw new EvaluationError(
			this.nodeName,
			"{leftNodeValue} and {rightNodeValue} must have type DomainValueNumber | number",
		);
	}
}
