import Production from "knowledge-shell/models/production";
import Node from "./node";

export default class ValueNode extends Node {
	public value!: any;

	constructor(value: any, production: Production) {
		super(production);
		this.value = value;
	}

	public evaluate(): any {
		return this.value;
	}
}
