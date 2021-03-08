import Node from "./node";
import BinarNode from "./binar-node";
import FrameKeyWord from "../constants";
import { Frame, Production, DomainValueFrame } from "knowledge-shell/models";

export default class AsNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): Frame {
    let result;

    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();

    if (rightNodeValue === FrameKeyWord) {
      if (leftNodeValue instanceof DomainValueFrame) {
        result = leftNodeValue.value;
      }
      if (leftNodeValue instanceof Frame) {
        result = this.production.slot.owner.domain.getDomainValueFrameByFrame(leftNodeValue).value;
      }
      if (typeof(leftNodeValue) === "string") {
        result = this.production.slot.owner.domain.getDomainValueFrameByFrameName(leftNodeValue).value;
      }
      //@ts-ignore
      return result;
    }

    throw new Error("AsNode must evaluate to DomainValueFrame");
  }
}
