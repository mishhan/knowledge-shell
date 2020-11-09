import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";

export default class MoreEqualNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  evaluate(): boolean {
    //TODO TYPE CHECKING
    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();
    return leftNodeValue >= rightNodeValue;
  }
}
