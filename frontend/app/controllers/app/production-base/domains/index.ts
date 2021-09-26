import Controller from "@ember/controller";
import { action } from "@ember/object";
import { Domain, DomainValue } from "knowledge-shell/models";

export default class AppProductionBaseDomainsIndex extends Controller {
	get domains(): Domain[] {
		return this.model.domains;
	}

	@action
	addDomain(): void {
		this.transitionToRoute("app.production-base.domains.new");
	}

	@action
	editDomain(domain: Domain): void {
		this.transitionToRoute("app.production-base.domains.edit", domain.id);
	}

	@action
	async deleteDomain(domain: Domain): Promise<void> {
		domain.domainValues.forEach(async (domainValue: DomainValue) => {
			await domainValue.destroyRecord();
		});
		await domain.destroyRecord();
	}
}

declare module "@ember/controller" {
	interface Registry {
		"app/production-base/domains/index": AppProductionBaseDomainsIndex;
	}
}
