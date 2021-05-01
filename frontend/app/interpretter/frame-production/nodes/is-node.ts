import { DomainValueFrame } from "knowledge-shell/models";
import BinarNode from "./binar-node";
import { InterpretationException } from "../exceptions";

export default class IsNode extends BinarNode {
	public evaluate(): any {
		const leftNodeValue = this.leftNode.evaluateR();
		const rightNodeValue = this.rightNode.evaluateR();

		if (leftNodeValue instanceof DomainValueFrame) {
			const leftNodeFrame = leftNodeValue.value;
			const rightNodeValueFrame = leftNodeValue.domain.getDomainValueFrameByFrameName(rightNodeValue);
			if (rightNodeValueFrame) {
				const rightNodeFrame = rightNodeValueFrame.value;
				const rightNodeIsParent = rightNodeFrame.isParentOf(leftNodeFrame);
				return rightNodeIsParent;
			}

			throw new InterpretationException(this.constructor.name, `frame {${rightNodeValue}} is undefined in framebase`);
		}

		throw new InterpretationException(this.constructor.name, `{leftNodeValue} must have type DomainValueFrame`);
	}
}
