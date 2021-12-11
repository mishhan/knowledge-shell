import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Domain, DomainValue } from "knowledge-shell/models";
import sort from "knowledge-shell/utils/sort";

export default class AppFrameBaseDomainsIndexController extends Controller {
	queryParams = ["sortBy", "sortDirection"];

	@tracked filter = "";
	@tracked sortBy = "";
	@tracked sortDirection = "";

	get domains(): Domain[] {
		const { domains } = this.model;
		const sortedDomains = sort<Domain>(domains.toArray(), this.sortBy, this.sortDirection);
		return sortedDomains;
	}

	@action
	addDomain(): void {
		this.transitionToRoute("app.frame-base.domains.new");
	}

	@action
	editDomain(domain: Domain): void {
		this.transitionToRoute("app.frame-base.domains.edit", domain.id);
	}

	@action
	async deleteDomain(domain: Domain): Promise<void> {
		domain.domainValues.forEach(async (domainValue: DomainValue) => {
			await domainValue.destroyRecord();
		});
		await domain.destroyRecord();
	}

	@action
	setSortParameters(sortBy: string, sortDirection: string): void {
		this.sortBy = sortBy;
		this.sortDirection = sortDirection;
	}
}
