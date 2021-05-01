import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from "@ember/object";
import { Domain, DomainValue } from "knowledge-shell/models";

export default class FrameBaseDomains extends Controller {
	@tracked search = "";

	@computed("model.{domains.[],frameDomain}")
	get orderedDomains(): Domain[] {
		const { frameDomain } = this.model;
		const domains = this.model.domains.filter((domain: Domain) => !domain.isReadOnly);
		const sortedDomains = domains.sortBy("name");
		return [frameDomain].concat(sortedDomains);
	}

	@action
	addDomain() {
		this.store.createRecord("domain", { name: "New Domain", frameBase: this.model }).save();
	}

	@action
	saveDomain(domain: Domain): void {
		domain.save();
		domain.domainValues.forEach((value: DomainValue) => {
			if (value.get("hasDirtyAttributes")) {
				value.save();
			}
		});
	}

	@action
	cancelDomainChanges(domain: Domain): void {
		domain.domainValues.forEach((value: DomainValue) => {
			value.rollbackAttributes();
		});

		domain.rollbackAttributes();
	}

	@action
	deleteDomain(domain: Domain): void {
		// eslint-disable-next-line no-alert
		const shouldBeDeleted = window.confirm(`Are you sure you want to delete ${domain.name}?`);
		if (shouldBeDeleted) {
			domain.domainValues.forEach((domainValue: DomainValue) => {
				domainValue.destroyRecord();
			});
			this.model.domains.removeObject(domain);
			domain.destroyRecord();
		}
	}
}

declare module "@ember/controller" {
	interface Registry {
		"frame-base/domains": FrameBaseDomains;
	}
}
