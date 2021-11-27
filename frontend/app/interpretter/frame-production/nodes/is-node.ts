import { DomainValueFrame } from "knowledge-shell/models";
import { Node, BinarNode } from "../../common/nodes";
import { EvaluationError } from "../../common";

export default class IsNode extends BinarNode {
	constructor(leftNode: Node, rightNode: Node) {
		super(leftNode, rightNode, "IsNode");
	}

	public evaluate(): any {
		const leftNodeValue = this.leftNode.evaluateValue();
		const rightNodeValue = this.rightNode.evaluateValue();

		if (leftNodeValue instanceof DomainValueFrame) {
			const leftNodeFrame = leftNodeValue.value;
			const rightNodeValueFrame = leftNodeValue.domain.getDomainValueFrameByFrameName(rightNodeValue);
			if (rightNodeValueFrame) {
				const rightNodeFrame = rightNodeValueFrame.value;
				const rightNodeIsParent = rightNodeFrame.isParentOf(leftNodeFrame);
				return rightNodeIsParent;
			}

			throw new EvaluationError(this.nodeName, `frame {${rightNodeValue}} is undefined in framebase`);
		}

		throw new EvaluationError(this.nodeName, `{leftNodeValue} must have type DomainValueFrame`);
	}
}
