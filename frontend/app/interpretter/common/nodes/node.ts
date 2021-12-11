import { DomainValue, Slot, Variable } from "knowledge-shell/models";

export default abstract class Node {
	protected readonly nodeName: string;
	constructor(nodeName: string) {
		this.nodeName = nodeName;
	}

	public abstract evaluate(): any;

	public toValue(value: Slot | Variable | string | number | null): DomainValue | string | number | null {
		if (value instanceof Slot) {
			const slotValue = value.value;
			return slotValue;
		}

		if (value instanceof Variable) {
			const variableValue = value.value;
			return variableValue;
		}

		return value;
	}

	public evaluateValue(): any {
		const evaluatedValue = this.evaluate();
		const value = this.toValue(evaluatedValue);
		return value;
	}
}
