import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";

export default class AssignNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate() {
    let leftNodeValue = this.leftNode.evaluate();
    const rightNodeValue = this.rightNode.evaluate();

    if (leftNodeValue == null || rightNodeValue == null) {
      return null;
    }

    leftNodeValue.value = leftNodeValue.domain.getDomainValueStringByName(rightNodeValue.valueStr);
    return rightNodeValue;
  }
}
