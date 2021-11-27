import { DomainValueNumber, DomainValueString } from "knowledge-shell/models";
import { EvaluationError } from "..";
import Node from "./node";
import { NodeValue, ValueType } from "../node-value";

export default abstract class BinarNode extends Node {
	protected readonly leftNode: Node;
	protected readonly rightNode: Node;

	constructor(leftNode: Node, rightNode: Node, nodeName: string) {
		super(nodeName);
		this.leftNode = leftNode;
		this.rightNode = rightNode;
	}

	protected getLeftNodeValue(): NodeValue {
		const nodeValue = this.getNodeValue(this.leftNode);
		return nodeValue;
	}

	protected getRightNodeValue(): NodeValue {
		const nodeValue = this.getNodeValue(this.rightNode);
		return nodeValue;
	}

	private getNodeValue(node: Node): NodeValue {
		const evaluatedValue = node.evaluateValue();
		const isNumber = this.isNodeValueNumber(evaluatedValue);
		const isString = this.isNodeValueString(evaluatedValue);
		const isBoolean = this.isNodeValueBoolean(evaluatedValue);

		if (isNumber) {
			const value = this.getNodeValueNumber(evaluatedValue);
			return {
				Type: ValueType.Number,
				NodeValue: evaluatedValue,
				Value: value,
			};
		}

		if (isString) {
			const value = this.getNodeValueString(evaluatedValue);
			return {
				Type: ValueType.String,
				NodeValue: evaluatedValue,
				Value: value,
			};
		}

		if (isBoolean) {
			return {
				Type: ValueType.Boolean,
				NodeValue: evaluatedValue,
				Value: evaluatedValue,
			};
		}

		throw new EvaluationError(this.nodeName, "unknown node value type");
	}

	private isNodeValueNumber(nodeValue: any): boolean {
		const isNumber = nodeValue instanceof DomainValueNumber || typeof nodeValue === "number";
		return isNumber;
	}

	private isNodeValueString(nodeValue: any): boolean {
		const isString = nodeValue instanceof DomainValueString || typeof nodeValue === "string";
		return isString;
	}

	private isNodeValueBoolean(nodeValue: any): boolean {
		const isBoolean = typeof nodeValue === "boolean";
		return isBoolean;
	}

	private getNodeValueNumber(nodeValue: DomainValueNumber | number): number {
		const nodeValueNumber = nodeValue instanceof DomainValueNumber ? nodeValue.value : nodeValue;
		return nodeValueNumber;
	}

	private getNodeValueString(nodeValue: DomainValueString | string): string {
		const nodeValueString = nodeValue instanceof DomainValueString ? nodeValue.value : nodeValue;
		return nodeValueString;
	}
}
