import Node from "./node";
import BinarNode from "./binar-node";
import { Frame, Production, Slot } from "knowledge-shell/models";

export default class FrameGetSlotNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): Slot {
    const frame: Frame = this.leftNode.evaluateR();
    if (frame) {
      const rightNodeValue = this.rightNode.evaluateR();
      return frame.getSlot(rightNodeValue);
    }

    throw new Error(`${typeof(FrameGetSlotNode)} frame is undefined`);
  }
}
