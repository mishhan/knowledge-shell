import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { ProductionEngine, ConsultationStatus } from "knowledge-shell/services/production";
import { DomainValue, Variable, VariableType } from "knowledge-shell/models";
import TreeInfoConverter from "knowledge-shell/services/tree-info-converter";

export default class AppProductionBaseTestingController extends Controller {
	@service("production/production-engine") productionEngine!: ProductionEngine;
	@service("tree-info-converter") treeInfoConverter!: TreeInfoConverter;

	@tracked goalVariable!: Variable;
	@tracked currentVariable!: Variable;
	@tracked goalVariableInference!: any;
	@tracked lastSettedVariable!: Variable;

	get goalVariables(): Variable[] {
		const { variables } = this.model;
		const derrivableVariables = variables.filter(
			(variable: Variable) => variable.variableType === VariableType.Derrivable,
		);
		const derrivableRequestedVariables = variables.filter(
			(variable: Variable) => variable.variableType === VariableType.DerrivableRequested,
		);
		const requestedVariables = variables.filter(
			(variable: Variable) => variable.variableType === VariableType.Requested,
		);
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
		this.goalVariableInference = this.treeInfoConverter.convertVariableInference(
			this.productionEngine.goalVariableInference,
		);
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
