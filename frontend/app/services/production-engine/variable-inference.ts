import { Rule, Variable } from "knowledge-shell/models";

export default class VariableInference {
	public variable!: Variable;
	public rule!: Rule;
	public inference!: Array<VariableInference>;

	constructor(variable: Variable) {
		this.variable = variable;
		this.inference = [];
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

	public toLog(): { name: string; children: any } {
		// @ts-ignore
		const explanationLog = this.inferenceToLog(this);
		return explanationLog;
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

	private inferenceToLog(variableInfrence: VariableInference): { name: string; children: any } {
		const explanationLog = {
			// @ts-ignore
			name: `${variableInfrence.variable.name}: ${variableInfrence.variable.value?.valueStr}`,
			children: [
				{
					name: `Reason: ${variableInfrence.rule?.reason}`,
					children: [],
				},
			],
		};

		for (const inference of variableInfrence.inference) {
			const inf = this.inferenceToLog(inference);
			// @ts-ignore
			explanationLog.children[0].children.push(inf);
		}

		return explanationLog;
	}
}
