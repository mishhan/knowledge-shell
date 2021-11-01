import { Frame, Slot } from "knowledge-shell/models";
import { Node, BinarNode } from "../../common/nodes";
import { EvaluationError } from "../../common";

export default class FrameGetSlotNode extends BinarNode {
	constructor(leftNode: Node, rightNode: Node) {
		super(leftNode, rightNode, "FrameGetSlotNode");
	}

	public evaluate(): Slot {
		const frame: Frame = this.leftNode.evaluateValue();
		if (frame) {
			const rightNodeValue = this.rightNode.evaluateValue();
			const frameSlot = frame.getSlot(rightNodeValue);
			if (frameSlot) {
				return frameSlot;
			}

			throw new EvaluationError(frame.name, rightNodeValue);
		}

		throw new EvaluationError(this.nodeName, "undefined frame");
	}
}
