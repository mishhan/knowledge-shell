import Node from "./node";

export default class ValueNode extends Node {
	protected readonly value: string | number;

	constructor(value: string | number, nodeName = "ValueNode") {
		super(nodeName);
		this.value = value;
	}

	public evaluate(): string | number {
		return this.value;
	}
}
