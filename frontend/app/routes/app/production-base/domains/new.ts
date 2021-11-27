import Route from "@ember/routing/route";
import { action } from "@ember/object";
import { DomainValue, ProductionBase } from "knowledge-shell/models";

export default class extends Route {
	model(): any {
		const productionBase = this.modelFor("app.production-base") as ProductionBase;
		const { domains, variables } = productionBase;
		const domain = this.store.createRecord("domain", {
			knowledgeBase: productionBase,
		});
		return {
			domain,
			domains,
			variables,
		};
	}

	@action
	willTransition(): void {
		const model = this.controller.model.domain;
		const domainValues = model.domainValues.toArray();
		domainValues.forEach((domainValue: DomainValue) => {
			if (domainValue.get("hasDirtyAttributes")) {
				domainValue.rollbackAttributes();
			}
		});
		if (model?.get("hasDirtyAttributes")) {
			model.rollbackAttributes();
		}
	}
}
