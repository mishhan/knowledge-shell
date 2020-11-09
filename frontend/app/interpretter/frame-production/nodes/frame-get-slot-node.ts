import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";
import Frame from "knowledge-shell/models/frame";
import Slot from "knowledge-shell/models/slot";

export default class FrameGetSlotNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): Slot | undefined {
    const frame: Frame = this.leftNode.evaluateR();
    if (frame) {
      return frame.getSlot(this.rightNode.evaluateR());
    }
    return undefined;
  }
}
