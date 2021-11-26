import Controller from "@ember/controller";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from "@ember/object";
import { Domain, DomainValue } from "knowledge-shell/models";

export default class AppFrameBaseDomainsIndexController extends Controller {
	@computed("model.{domains.[],frameDomain}")
	get domains(): Domain[] {
		const { frameDomain } = this.model;
		const domains = this.model.domains.filter((domain: Domain) => !domain.isReadOnly);
		const sortedDomains = domains.sortBy("name");
		return [frameDomain].concat(sortedDomains);
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
}
