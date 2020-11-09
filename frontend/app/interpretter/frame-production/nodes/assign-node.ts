import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";

export default class AssignNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate() {
    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();

    if (leftNodeValue == null || rightNodeValue == null) {
      return null;
    }

    leftNodeValue.value = leftNodeValue.domain.getValue(rightNodeValue.valueStr);
    return rightNodeValue;
  }
}
