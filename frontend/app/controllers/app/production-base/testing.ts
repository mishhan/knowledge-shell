import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import ProductionEngine, { ConsultationStatus } from "knowledge-shell/services/production-engine";
import { tracked } from "@glimmer/tracking";
import { DomainValue, Variable } from "knowledge-shell/models";

export default class AppProductionBaseTesting extends Controller {
	@service("production-engine") productionEngine!: ProductionEngine;

	@tracked goalVariable!: Variable;
	@tracked currentVariable!: Variable;

	get variables(): Variable[] {
		return this.model.variables;
	}

	get hasGoalVariable(): boolean {
		const hasGoalVariable = this.goalVariable !== undefined;
		return hasGoalVariable;
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
		const currentState = this.productionEngine.getCurrentState();
		switch (currentState.Status) {
			case ConsultationStatus.Continue:
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
		// TODO
	}
}

declare module "@ember/controller" {
	interface Registry {
		"app/production-base/testing": AppProductionBaseTesting;
	}
}
