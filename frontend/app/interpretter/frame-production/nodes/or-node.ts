import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";

export default class OrNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): boolean {
    //TYPE CHECKING
    const leftNodeValue = this.leftNode.evaluateR() as boolean;
    const rightNodeValue = this.rightNode.evaluateR() as boolean;
    return leftNodeValue || rightNodeValue;
  }
}
