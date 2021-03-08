import Node from "./node";
import BinarNode from "./binar-node";
import { Production } from "knowledge-shell/models";

export default class IsNode extends BinarNode {
  constructor(leftNode: Node, rightNode: Node, production: Production) {
    super(leftNode, rightNode, production);
  }

  public evaluate(): any {
    //TODO
    throw new Error("Not implemented exception");
  }
}
