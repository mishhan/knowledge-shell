import Node from "./node";
import UnarNode from "./unar-node";
import Production from "knowledge-shell/models/production";

export default class NotNode extends UnarNode {
  constructor(operand: Node, production: Production) {
    super(operand, production);
  }

  public evaluate(): boolean {
    const result = this.operand.evaluateR() as boolean;
    return !result;
  }
}
