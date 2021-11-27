import Route from "@ember/routing/route";
import { action } from "@ember/object";
import { DomainValue, ProductionBase } from "knowledge-shell/models";

export default class extends Route {
	model({ domain_id }: { domain_id: string }): any {
		const productionBase = this.modelFor("app.production-base") as ProductionBase;
		const { domains, variables } = productionBase;
		const domain = this.store.peekRecord("domain", domain_id);
		const domainValues = domain?.domainValues.toArray();
		return {
			domain,
			domainValues,
			domains,
			variables,
		};
	}

	@action
	willTransition(): void {
		const model = this.controller.model.domain;
		model.domainValues.forEach((domainValue: DomainValue) => {
			if (domainValue.get("hasDirtyAttributes")) {
				domainValue.rollbackAttributes();
			}
		});
		if (model?.get("hasDirtyAttributes")) {
			model.rollbackAttributes();
		}
	}
}
