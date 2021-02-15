import Node from "./node";
import BinarNode from "./binar-node";
import { Production, DomainValueNumber } from "knowledge-shell/models";

export default class MinusNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): any {
    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();

    if (this.isNumberNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
      const leftNodeValueNumber = this.getNodeValueNumber(leftNodeValue);
      const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
      const nodeValueNumber = leftNodeValueNumber - rightNodeValueNumber;
      if (leftNodeValue instanceof DomainValueNumber) {
        const nodeValue = leftNodeValue.domain.getDomainValue(nodeValueNumber);
        return nodeValue;
      }

      return nodeValueNumber;
    }

    throw new Error("MinusNode nodes must have type DomainValueNumber or number");
  }
}
