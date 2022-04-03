import { Rule, Variable } from "knowledge-shell/models";

export default class VariableInference {
	private readonly variable!: Variable;
	private rule!: Rule;
	private inference!: VariableInference[];

	constructor(variable: Variable) {
		this.variable = variable;
		this.inference = [];
	}

	public get currentVariable(): Variable {
		return this.variable;
	}

	public get currentRule(): Rule {
		return this.rule;
	}

	public get currentInference(): VariableInference[] {
		return this.inference;
	}

	/**
	 * Adds inference of current variable
	 * @param currentVariable - current variable
	 * @param variableInInference - variable used to inference currentVariable
	 */
	public addVariableInference(currentVariable: Variable, variableInInference: Variable): void {
		const currentInference = this.findInference(currentVariable, this);
		const variableInInferenceInference = this.findInference(variableInInference, this);
		if (variableInInferenceInference) return;

		const variableInference = new VariableInference(variableInInference);
		currentInference?.inference.push(variableInference);
	}

	/**
	 * Sets rule fired to inference variable
	 * @param currentVariable - variable
	 * @param rule - rule
	 */
	public setInferenceRule(currentVariable: Variable, rule: Rule): void {
		const currentVariableInference = this.findInference(currentVariable, this);
		if (currentVariableInference) currentVariableInference.rule = rule;
	}

	private findInference(variable: Variable, variableInfrence: VariableInference): VariableInference | undefined {
		const isCurrentVariable = variable.id === variableInfrence.variable.id;
		if (isCurrentVariable) {
			return variableInfrence;
		}

		for (const variableInference of variableInfrence.inference) {
			const inference = this.findInference(variable, variableInference);
			if (inference) return inference;
		}

		return undefined;
	}
}
