import Node from "./node";
import BinarNode from "./binar-node";
import { DomainValueFrame, Production } from "knowledge-shell/models";
import { UndefinedFrameError } from "../error";

export default class IsNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

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

      throw new UndefinedFrameError(`Frame [${rightNodeValue}] is undefined in frame base`);
    }
  }
}
