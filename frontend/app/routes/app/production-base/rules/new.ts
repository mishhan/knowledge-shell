import Route from "@ember/routing/route";
import { action } from "@ember/object";
import { ProductionBase } from "knowledge-shell/models";

export default class extends Route {
	model(): any {
		const productionBase = this.modelFor("app.production-base") as ProductionBase;
		const { variables } = productionBase;
		const ruleCount = productionBase.rules.length;
		const rule = this.store.createRecord("rule", {
			productionBase,
			order: ruleCount,
		});
		return {
			rule,
			variables,
		};
	}

	@action
	willTransition(): void {
		const model = this.controller.model.rule;
		if (model?.get("hasDirtyAttributes")) {
			model.rollbackAttributes();
		}
	}
}
