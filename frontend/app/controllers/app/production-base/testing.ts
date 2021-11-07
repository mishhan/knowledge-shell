import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import ProductionEngine from "knowledge-shell/services/production-engine";
import { tracked } from "@glimmer/tracking";
import { DomainValue, Rule, Variable } from "knowledge-shell/models";

export default class AppProductionBaseTesting extends Controller {
	@service("production-engine") productionEngine!: ProductionEngine;

	@tracked goalVariable!: Variable;
	@tracked currentVariable!: Variable;
	@tracked usedRules!: Rule[];

	get variables(): Variable[] {
		return this.model.variables;
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
			this.productionEngine.initialize(this.model, this.goalVariable);
			const currentState = this.productionEngine.getCurrentState();
			if (currentState.Status === "Continue") {
				this.currentVariable = currentState.Variable;
			}
		}
	}

	@action
	answer(): void {
		const currentState = this.productionEngine.getCurrentState();
		switch (currentState.Status) {
			case "Continue":
				this.currentVariable = currentState.Variable;
				break;
			case "Success":
				// eslint-disable-next-line no-alert
				alert("Success");
				this.usedRules = this.productionEngine.getUsedRules();
				break;
			case "Failed":
				// eslint-disable-next-line no-alert
				alert("Failed");
				this.usedRules = this.productionEngine.getUsedRules();
				break;
			default:
				throw new Error();
		}
	}
}

declare module "@ember/controller" {
	interface Registry {
		"app/production-base/testing": AppProductionBaseTesting;
	}
}
