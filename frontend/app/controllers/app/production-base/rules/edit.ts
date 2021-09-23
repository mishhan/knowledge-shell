import Controller from "@ember/controller";
import { action } from "@ember/object";
import { Rule, Variable } from "knowledge-shell/models";

export default class AppProductionBaseRulesEdit extends Controller {
	get currentRule(): Rule {
		return this.model.rule;
	}

	get variables(): Variable[] {
		return this.model.variables;
	}

	@action
	async save(name: string, reason: string, premise: string, consequence: string): Promise<void> {
		this.currentRule.setProperties({
			name,
			reason,
			premise,
			consequence,
		});
		await this.currentRule.save().then(() => this.transitionToRoute("app.production-base.rules"));
	}

	@action
	cancelChanges(): void {
		this.currentRule.rollbackAttributes();
		this.transitionToRoute("app.production-base.rules");
	}
}

declare module "@ember/controller" {
	interface Registry {
		"app/production-base/rules/edit": AppProductionBaseRulesEdit;
	}
}
