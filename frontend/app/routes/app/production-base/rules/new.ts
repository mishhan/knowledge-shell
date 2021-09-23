import Route from "@ember/routing/route";
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
}
