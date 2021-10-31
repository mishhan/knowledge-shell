import { Frame, DomainValueFrame, Production } from "knowledge-shell/models";
import { Node, BinarNode } from "../../common/nodes";
import FrameKeyWord from "../constants";
import { EvaluationError } from "../../common";

export default class AsNode extends BinarNode {
	private readonly production: Production;

	constructor(leftNode: Node, rightNode: Node, production: Production) {
		super(leftNode, rightNode, "AsNode");
		this.production = production;
	}

	public evaluate(): Frame {
		const leftNodeValue = this.leftNode.evaluateValue();
		const rightNodeValue = this.rightNode.evaluateValue();

		if (rightNodeValue === FrameKeyWord) {
			if (leftNodeValue instanceof DomainValueFrame) {
				return leftNodeValue.value;
			}
			if (leftNodeValue instanceof Frame) {
				return this.production.slot.owner.domain.getDomainValueFrameByFrame(leftNodeValue).value;
			}
			if (typeof leftNodeValue === "string") {
				return this.production.slot.owner.domain.getDomainValueFrameByFrameName(leftNodeValue).value;
			}

			throw new EvaluationError("AsNode", "{leftNodeValue} must have type DomainValueFrame | Frame | string");
		}

		throw new EvaluationError("AsNode", `{rightNodeValue} must be equal to ${FrameKeyWord}`);
	}
}
