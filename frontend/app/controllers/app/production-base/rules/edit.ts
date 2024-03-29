import Controller from "@ember/controller";
import { action } from "@ember/object";
import { Rule, Variable } from "knowledge-shell/models";

export default class AppProductionBaseRulesEditController extends Controller {
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
		await this.currentRule.save();
		this.transitionToRoute("app.production-base.rules");
	}

	@action
	cancelChanges(): void {
		this.currentRule.rollbackAttributes();
		this.transitionToRoute("app.production-base.rules");
	}
}
