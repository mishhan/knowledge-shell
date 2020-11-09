import Node from "./node";
import Production from "knowledge-shell/models/production";

export default class IfNode extends Node {
  protected question!: Node;
  protected trueExpression!: Node;
  protected falseExpression?: Node;

  constructor(question: Node, trueExpression: Node, falseExpression: Node | undefined, production: Production) {
    super(production);
    this.question = question;
    this.trueExpression = trueExpression;
    this.falseExpression = falseExpression;
  }

  public evaluate(): any {
    const result = this.question.evaluate() as boolean;
    if (result) {
      return this.trueExpression.evaluate();
    } else {
      return this.falseExpression?.evaluate();
    }
  }
}
