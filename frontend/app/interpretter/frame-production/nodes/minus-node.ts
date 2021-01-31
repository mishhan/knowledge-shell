import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";
import { DomainValueNumber } from "knowledge-shell/models";

export default class MinusNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  evaluate() {
    const leftNode = this.leftNode.evaluateR();
    const rightNode = this.rightNode.evaluateR();

    if (this.isNumberNode(leftNode) && this.isNumberNode(rightNode)) {
      const leftNodeValue = this.getNodeValueNumber(leftNode);
      const rightNodeValue = this.getNodeValueNumber(rightNode);
      const nodeValueNumber = leftNodeValue - rightNodeValue;
      if (leftNode instanceof DomainValueNumber) {
        const nodeValue = leftNode.domain.getDomainValue(nodeValueNumber);
        return nodeValue;
      }

      return nodeValueNumber;
    }

    throw new Error("MinusNode nodes must have type DomainValueNumber or number");
  }
}
