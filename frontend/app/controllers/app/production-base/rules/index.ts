import Controller from "@ember/controller";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from "@ember/object";
import { Rule } from "knowledge-shell/models";

export default class AppProductionBaseRulesIndex extends Controller {
	@computed("model.rules.[]")
	get rules(): Rule[] {
		const { rules } = this.model;
		const orderedRules = rules.sortBy("order");
		return orderedRules;
	}

	@computed("rules.@each.hasDirtyAttributes")
	get enableSave(): boolean {
		const enableSave = this.rules.any((rule: Rule) => rule.get("hasDirtyAttributes"));
		return enableSave;
	}

	@action
	async saveRules(): Promise<void> {
		this.rules
			.filter((rule: Rule) => rule.hasDirtyAttributes)
			.forEach(async (rule: Rule) => {
				await rule.save();
			});
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
