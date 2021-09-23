import Route from "@ember/routing/route";
import { ProductionBase } from "knowledge-shell/models";

export default class extends Route {
	model({ rule_id }: { rule_id: string }): any {
		const productionBase = this.modelFor("app.production-base") as ProductionBase;
		const { variables } = productionBase;
		const rule = this.store.peekRecord("rule", rule_id);
		return {
			rule,
			variables,
		};
	}
}
