import Node from "./node";
import Production from "knowledge-shell/models/production";

export default abstract class BinarNode extends Node {
  public leftNode!: Node;
  public rightNode!: Node;

  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(production);
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}
