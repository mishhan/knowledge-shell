import { Rule, Variable } from "knowledge-shell/models";
import { EvaluationError } from "../../common";
import { Node } from "../../common/nodes";

export default class VariableValueNode extends Node {
	protected readonly rule: Rule;
	protected readonly variableName: string;

	constructor(rule: Rule, variableName: string) {
		super("VariableValueNode");
		this.rule = rule;
		this.variableName = variableName;
	}

	public evaluate(): Variable | null {
		const variable = this.rule.getVariable(this.variableName);
		if (variable) {
			return variable;
		}

		throw new EvaluationError(this.nodeName, "undefined variable");
	}
}
