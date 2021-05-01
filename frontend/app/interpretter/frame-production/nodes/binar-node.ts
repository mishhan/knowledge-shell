import { Production, DomainValueNumber, DomainValueString } from "knowledge-shell/models";
import Node from "./node";
import { InterpretationException } from "../exceptions";

export default abstract class BinarNode extends Node {
	protected leftNode!: Node;

	protected rightNode!: Node;

	constructor(leftNode: Node, rightNode: Node, production: Production) {
		super(production);
		this.leftNode = leftNode;
		this.rightNode = rightNode;
	}

	public isNumberNode(nodeValue: any): boolean {
		if (nodeValue instanceof DomainValueNumber || typeof nodeValue === "number") {
			return true;
		}

		return false;
	}

	public isStringNode(nodeValue: any): boolean {
		if (nodeValue instanceof DomainValueString || typeof nodeValue === "string") {
			return true;
		}

		return false;
	}

	public getNodeValueNumber(nodeValue: DomainValueNumber | number): number {
		if (nodeValue instanceof DomainValueNumber) {
			return nodeValue.value;
		}
		if (typeof nodeValue === "number") {
			return nodeValue;
		}

		throw new InterpretationException(this.constructor.name, "{nodeValue} must have type DomainValueNumber | number");
	}

	public getNodeValueString(nodeValue: DomainValueString | string): string {
		if (nodeValue instanceof DomainValueString) {
			return nodeValue.value;
		}
		if (typeof nodeValue === "string") {
			return nodeValue;
		}

		throw new InterpretationException(this.constructor.name, "{nodeValue} must have type DomainValueString | string");
	}
}
