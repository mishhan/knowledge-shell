import Node from "./node";
import Production from "knowledge-shell/models/production";
import { DomainValueNumber, DomainValueString } from "knowledge-shell/models";

export default abstract class BinarNode extends Node {
  public leftNode!: Node;
  public rightNode!: Node;

  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(production);
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }

  public isNumberNode(nodeValue: any): boolean {
    if (nodeValue instanceof DomainValueNumber || (typeof(nodeValue) === 'string' && !isNaN(parseInt(nodeValue)))) {
      return true;
    }

    return false;
  }

  public isStringNode(nodeValue: any): boolean {
    if (nodeValue instanceof DomainValueString || typeof(nodeValue) === 'string') {
      return true;
    }

    return false;
  }

  public getNodeValueNumber(nodeValue: any): number {
    if (nodeValue instanceof DomainValueNumber) {
      return nodeValue.value;
    }
    if (typeof(nodeValue) === 'string') {
      const isNumber = !isNaN(parseInt(nodeValue));
      if (isNumber) {
        const nodeValueNumber = parseInt(nodeValue);
        return nodeValueNumber;
      }
    }

    throw new Error("nodeValue must be DomainValueNumber or number string");
  }

  public getNodeValueString(nodeValue: any): string {
    if (nodeValue instanceof DomainValueString) {
      return nodeValue.value;
    }
    if (typeof(nodeValue) === 'string') {
      return nodeValue;
    }

    throw new Error("nodeValue must be DomainValueString or string");
    
  }
}
