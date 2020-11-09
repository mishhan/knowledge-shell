/* eslint-disable no-unused-vars */
import Node from "./node";
import BinarNode from "./binar-node";
import Production from "knowledge-shell/models/production";

export default class IsNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  evaluate(): any {
    //TODO
    throw new Error("Not implemented exception");
  }
}
