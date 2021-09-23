import Route from "@ember/routing/route";
import { ProductionBase } from "knowledge-shell/models";

export default class extends Route {
	model({ variable_id }: { variable_id: string }): any {
		const productionBase = this.modelFor("app.production-base") as ProductionBase;
		const variable = this.store.peekRecord("variable", variable_id);
		const { variables, domains } = productionBase;
		return {
			variables,
			domains,
			variable,
		};
	}
}
