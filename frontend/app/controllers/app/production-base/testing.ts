import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import ProductionEngine, { ConsultationStatus } from "knowledge-shell/services/production-engine";
import { tracked } from "@glimmer/tracking";
import { DomainValue, Variable, VariableType } from "knowledge-shell/models";

export default class AppProductionBaseTestingController extends Controller {
	@service("production-engine") productionEngine!: ProductionEngine;

	@tracked goalVariable!: Variable;
	@tracked currentVariable!: Variable;
	@tracked lastSettedVariable!: Variable;

	get goalVariables(): Variable[] {
		const { variables } = this.model;
		const derrivableVariables = variables.filter((v: Variable) => v.variableType === VariableType.Derrivable);
		const derrivableRequestedVariables = variables.filter(
			(v: Variable) => v.variableType === VariableType.DerrivableRequested,
		);
		const requestedVariables = variables.filter((v: Variable) => v.variableType === VariableType.Requested);
		const goalVariables = [...derrivableVariables, ...derrivableRequestedVariables, ...requestedVariables];
		return goalVariables;
	}

	get hasGoalVariable(): boolean {
		const hasGoalVariable = this.goalVariable !== undefined;
		return hasGoalVariable;
	}

	get canResetToPreviousState(): boolean {
		const canResetToPreviousState = this.lastSettedVariable !== undefined;
		return canResetToPreviousState;
	}

	get variableInference(): Variable[] {
		return this.productionEngine.variableInferenceStack.toArray();
	}

	public initialize(): void {
		this.productionEngine.initialize(this.model);
	}

	@action
	setGoalVariable(variable: Variable): void {
		this.goalVariable = variable;
	}

	@action
	setVariableValue(variable: Variable, value: DomainValue): void {
		variable.value = value;
	}

	@action
	start(): void {
		if (this.goalVariable) {
			this.productionEngine.setGoal(this.goalVariable);
			this.calculateCurrentState();
		}
	}

	@action
	calculateCurrentState(): void {
		this.lastSettedVariable = this.currentVariable;
		const currentState = this.productionEngine.getCurrentState();
		switch (currentState.Status) {
			case ConsultationStatus.InProgress:
				this.currentVariable = currentState.Variable;
				break;
			case ConsultationStatus.Success:
				// eslint-disable-next-line no-alert
				alert("Success");
				break;
			case ConsultationStatus.Failed:
				// eslint-disable-next-line no-alert
				alert("Failed");
				break;
			default:
				throw new Error();
		}
	}

	@action
	getPreviousState(): void {
		if (this.canResetToPreviousState) {
			this.lastSettedVariable.value = null;
			this.calculateCurrentState();
		}
	}
}

declare module "@ember/controller" {
	interface Registry {
		"app/production-base/testing": AppProductionBaseTestingController;
	}
}
