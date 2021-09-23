import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Rule } from "knowledge-shell/models";

export default class AppProductionBaseRulesIndex extends Controller {
	@tracked filter = "";

	get canReorderRules(): boolean {
		return this.filter === "";
	}

	get rules(): Rule[] {
		return this.model.rules;
	}

	@action
	async deleteRule(rule: Rule): Promise<void> {
		await rule.destroyRecord();
	}

	@action
	reorderRules(reorderedRules: Rule[]): void {
		reorderedRules.forEach((rule: Rule, index: number) => {
			rule.order = index;
		});
	}
}

declare module "@ember/controller" {
	interface Registry {
		"app/production-base/rules/index": AppProductionBaseRulesIndex;
	}
}
