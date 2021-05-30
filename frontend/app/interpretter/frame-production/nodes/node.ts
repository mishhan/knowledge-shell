import Production from "knowledge-shell/models/production";
import Slot from "knowledge-shell/models/slot";

export default abstract class Node {
	protected production!: Production;

	constructor(production: Production) {
		this.production = production;
	}

	public evaluate(): any {}

	public toRValue(value: any): any {
		if (value === null) {
			return null;
		}

		if (value instanceof Slot) {
			return value.value;
		}

		return value;
	}

	public evaluateR(): any {
		const evaluatedValue = this.evaluate();
		const rValue = this.toRValue(evaluatedValue);
		return rValue;
	}
}
