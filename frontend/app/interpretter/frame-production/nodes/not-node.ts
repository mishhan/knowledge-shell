import UnarNode from "./unar-node";

export default class NotNode extends UnarNode {
	public evaluate(): boolean {
		const result = this.operand.evaluateR() as boolean;
		return !result;
	}
}
