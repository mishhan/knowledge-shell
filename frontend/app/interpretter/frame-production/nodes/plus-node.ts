import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";
import { DomainValueString } from "knowledge-shell/models";

export default class PlusNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  evaluate(): any {
    //TYPE CHECKING
    const leftNodeValue = this.leftNode.evaluateR();
    const rightNodeValue = this.rightNode.evaluateR();

    const rightNodeValueInt = parseInt(rightNodeValue);
    if (leftNodeValue instanceof DomainValueString && Number.isInteger(rightNodeValueInt)) {
      const leftNodeDomainValues = leftNodeValue.domain.domainValuesOrdered.toArray();
      const leftNodeValueIndex = leftNodeDomainValues.findIndex((value) => value === leftNodeValue);

      return leftNodeDomainValues.objectAt(leftNodeValueIndex + rightNodeValueInt);
    }

    if (rightNodeValue instanceof DomainValueString) {
      return leftNodeValue + rightNodeValue.valueStr;
    }
    return leftNodeValue + rightNodeValue;
  }
}
