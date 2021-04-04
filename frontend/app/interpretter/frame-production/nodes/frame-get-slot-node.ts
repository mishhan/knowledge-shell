import Node from "./node";
import BinarNode from "./binar-node";
import { Frame, Production, Slot } from "knowledge-shell/models";
import { UndefinedFrameError, UndefinedFrameSlotError } from "../error";

export default class FrameGetSlotNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): Slot {
    const frame: Frame = this.leftNode.evaluateR();
    if (frame) {
      const rightNodeValue = this.rightNode.evaluateR();
      const frameSlot = frame.getSlot(rightNodeValue);
      if (frameSlot) {
        return frameSlot;
      }

      throw new UndefinedFrameSlotError(frame.name, rightNodeValue, `Undefined slot ${rightNodeValue} in frame ${frame.name}`);
    }

    throw new UndefinedFrameError(`Undefined frame in FrameGetSlotNode`);
  }
}
