import Node from "./node";

export default abstract class UnarNode extends Node {
	protected readonly operand: Node;
	constructor(operand: Node, nodeName: string) {
		super(nodeName);
		this.operand = operand;
	}
}
