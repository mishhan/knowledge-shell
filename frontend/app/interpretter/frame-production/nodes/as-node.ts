import Node from "./node";
import BinarNode from "./binar-node";
import FrameKeyWord from "../constants";
import Production from "knowledge-shell/models/production";
import DomainValueFrame from "knowledge-shell/models/domain-value-frame";

export default class AsNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): DomainValueFrame | undefined {
    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();

    if (rightNodeValue === FrameKeyWord) {
      return this.production.slot.owner.domain.getFrameDomainValue(leftNodeValue);
    }
    throw new Error(`${typeof(AsNode)} must evaluate ${typeof(DomainValueFrame)}`);
  }
}
