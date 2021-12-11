import { EvaluationError } from "../errors";
import Node from "./node";
import UnarNode from "./unar-node";

export default class NotNode extends UnarNode {
	constructor(operand: Node) {
		super(operand, "NotNode");
	}

	public evaluate(): boolean {
		const result = this.operand.evaluateValue();
		const isResultBoolean = result instanceof Boolean;
		if (isResultBoolean) {
			const invertedResult = !result;
			return invertedResult;
		}

		throw new EvaluationError(this.nodeName, "result must be boolean");
	}
}
