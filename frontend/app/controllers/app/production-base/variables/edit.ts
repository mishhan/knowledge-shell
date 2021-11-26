import Controller from "@ember/controller";
import { action } from "@ember/object";
import { Domain, Variable, VariableType } from "knowledge-shell/models";

export default class AppProductionBaseVariablesEditController extends Controller {
	get currentVariable(): Variable {
		return this.model.variable;
	}

	get variables(): Variable[] {
		return this.model.variables;
	}

	get domains(): Domain[] {
		return this.model.domains;
	}

	@action
	async save(
		name: string,
		domain: Domain,
		variableType: VariableType,
		description: string,
		question: string,
	): Promise<void> {
		this.currentVariable.setProperties({
			name,
			domain,
			variableType,
			description,
			question,
		});
		await this.currentVariable.save();
		this.transitionToRoute("app.production-base.variables");
	}

	@action
	cancelChanges(): void {
		this.currentVariable.rollbackAttributes();
		this.transitionToRoute("app.production-base.variables");
	}
}
