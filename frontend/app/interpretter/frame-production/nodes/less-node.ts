import Node from "./node";
import BinarNode from "./binar-node";
import { Production } from "knowledge-shell/models";

export default class LessNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): boolean {
    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();

    if (this.isNumberNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
      const leftNodeValueNumber = this.getNodeValueNumber(leftNodeValue);
      const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
      return leftNodeValueNumber < rightNodeValueNumber;
    }

    throw new Error("LessNode nodes must have type DomainValueNumber or number");
  }
}
