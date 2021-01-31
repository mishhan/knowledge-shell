import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";
import { DomainValueNumber, DomainValueString } from "knowledge-shell/models";

export default class PlusNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  evaluate(): any {
    const leftNode = this.leftNode.evaluateR();
    const rightNode = this.rightNode.evaluateR();

    if (this.isNumberNode(leftNode) && this.isNumberNode(rightNode)) {
      const leftNodeValue = this.getNodeValueNumber(leftNode);
      const rightNodeValue = this.getNodeValueNumber(rightNode);
      const nodeValueNumber = leftNodeValue + rightNodeValue;
      if (leftNode instanceof DomainValueNumber) {
        const nodeValue = leftNode.domain.getDomainValue(nodeValueNumber);
        return nodeValue;
      }

      return nodeValueNumber;
    }

    if (this.isStringNode(leftNode) && this.isNumberNode(rightNode)) {
      const leftNodeValue = this.getNodeValueString(leftNode);
      const rightNodeValue = this.getNodeValueNumber(rightNode);
      const nodeValueString = leftNodeValue + rightNodeValue;
      if (leftNode instanceof DomainValueString) {
        const nodeValue = leftNode.domain.getDomainValue(nodeValueString);
        return nodeValue;
      }

      return nodeValueString;
    }

    if (this.isStringNode(leftNode) && this.isStringNode(rightNode)) {
      const leftNodeValue = this.getNodeValueString(leftNode);
      const rightNodeValue = this.getNodeValueString(rightNode);
      const nodeValueString = leftNodeValue + rightNodeValue;
      if (leftNode instanceof DomainValueString) {
        const nodeValue = leftNode.domain.getDomainValue(nodeValueString);
        return nodeValue;
      }

      return nodeValueString;
    }

    throw new Error("PlusNode nodes must have type (DomainValueNumber and number) or (DomainValueString and string or number)");
  }
}
