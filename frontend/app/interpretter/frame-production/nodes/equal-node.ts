import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";

export default class EqualNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): boolean {
    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();
    return leftNodeValue == rightNodeValue;
  }
}
