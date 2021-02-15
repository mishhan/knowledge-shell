import Node from "./node";
import BinarNode from "./binar-node";
import { DomainValueNumber, DomainValueString, Production } from "knowledge-shell/models";

export default class PlusNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  evaluate(): any {
    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();

    if (this.isNumberNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
      const leftNodeValueNumber = this.getNodeValueNumber(leftNodeValue);
      const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
      const nodeValueNumber = leftNodeValueNumber + rightNodeValueNumber;
      if (leftNodeValue instanceof DomainValueNumber) {
        const nodeValue = leftNodeValue.domain.getDomainValue(nodeValueNumber);
        return nodeValue;
      }

      return nodeValueNumber;
    }

    if (this.isStringNode(leftNodeValue) && this.isNumberNode(rightNodeValue)) {
      const leftNodeValueString = this.getNodeValueString(leftNodeValue);
      const rightNodeValueNumber = this.getNodeValueNumber(rightNodeValue);
      const nodeValueString = leftNodeValueString + rightNodeValueNumber;
      if (leftNodeValue instanceof DomainValueString) {
        const nodeValue = leftNodeValue.domain.getDomainValue(nodeValueString);
        return nodeValue;
      }

      return nodeValueString;
    }

    if (this.isStringNode(leftNodeValue) && this.isStringNode(rightNodeValue)) {
      const leftNodeValueString = this.getNodeValueString(leftNodeValue);
      const rightNodeValueString = this.getNodeValueString(rightNodeValue);
      const nodeValueString = leftNodeValueString + rightNodeValueString;
      if (leftNodeValue instanceof DomainValueString) {
        const nodeValue = leftNodeValue.domain.getDomainValue(nodeValueString);
        return nodeValue;
      }

      return nodeValueString;
    }

    throw new Error("PlusNode nodes must have type (DomainValueNumber and number) or (DomainValueString and string or number)");
  }
}
