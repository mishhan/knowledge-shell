import Route from "@ember/routing/route";
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
}
