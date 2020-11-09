import Node from "./node";
import Production from "knowledge-shell/models/production";

export default abstract class UnarNode extends Node {
  protected operand!: Node;

  constructor(operand: Node, production: Production) {
    super(production);
    this.operand = operand;
  }
}
