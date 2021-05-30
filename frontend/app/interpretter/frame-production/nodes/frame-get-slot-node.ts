import { Frame, Slot } from "knowledge-shell/models";
import BinarNode from "./binar-node";
import { InterpretationException, UndefinedFrameSlotException } from "../exceptions";

export default class FrameGetSlotNode extends BinarNode {
	public evaluate(): Slot {
		const frame: Frame = this.leftNode.evaluateR();
		if (frame) {
			const rightNodeValue = this.rightNode.evaluateR();
			const frameSlot = frame.getSlot(rightNodeValue);
			if (frameSlot) {
				return frameSlot;
			}

			throw new UndefinedFrameSlotException(frame.name, rightNodeValue);
		}

		throw new InterpretationException(this.constructor.name, "nndefined frame");
	}
}
