import { Frame, DomainValueFrame } from "knowledge-shell/models";
import BinarNode from "./binar-node";
import FrameKeyWord from "../constants";
import { InterpretationException } from "../exceptions";

export default class AsNode extends BinarNode {
	public evaluate(): Frame {
		const leftNodeValue = this.leftNode.evaluateR();
		const rightNodeValue = this.rightNode.evaluateR();

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

			throw new InterpretationException(
				this.constructor.name,
				`{leftNodeValue} must have type DomainValueFrame |Frame | string`,
			);
		}

		throw new InterpretationException(this.constructor.name, `{rightNodeValue} must be equal ${FrameKeyWord}`);
	}
}
