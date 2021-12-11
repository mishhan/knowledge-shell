import Route from "@ember/routing/route";
import { action } from "@ember/object";
import { ProductionBase } from "knowledge-shell/models";

export default class extends Route {
	model(): any {
		const productionBase = this.modelFor("app.production-base") as ProductionBase;
		const { variables, domains } = productionBase;
		const newVariable = this.store.createRecord("variable", {
			productionBase,
		});
		return {
			variables,
			domains,
			variable: newVariable,
		};
	}

	@action
	willTransition(): void {
		const model = this.controller.model.variable;
		if (model?.get("hasDirtyAttributes")) {
			model.rollbackAttributes();
		}
	}
}
