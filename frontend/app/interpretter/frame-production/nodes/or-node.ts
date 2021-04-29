import BinarNode from "./binar-node";

export default class OrNode extends BinarNode {
	public evaluate(): boolean {
		const leftNodeValue = this.leftNode.evaluateR() as boolean;
		const rightNodeValue = this.rightNode.evaluateR() as boolean;
		return leftNodeValue || rightNodeValue;
	}
}
