import Controller from "@ember/controller";
import { action } from "@ember/object";
import { Domain, DomainType, DomainValue } from "knowledge-shell/models";

export default class AppFrameBaseDomainsEdit extends Controller {
	get currentDomain(): Domain {
		return this.model.domain;
	}

	get domains(): Domain[] {
		return this.model.domains;
	}

	get initialDomainValues(): DomainValue[] {
		return this.model.domainValues;
	}

	@action
	async save(name: string, description: string, domainType: DomainType): Promise<void> {
		this.currentDomain.setProperties({
			name,
			description,
			domainType,
		});

		await this.currentDomain.save();
		this.currentDomain.domainValues.forEach(async (domainValue: DomainValue) => {
			if (domainValue.get("hasDirtyAttributes")) {
				await domainValue.save();
			}
		});
		await this.removeDeletedDomainValues();
		this.transitionToRoute("app.frame-base.domains");
	}

	@action
	cancelChanges(): void {
		const domainValues = this.currentDomain.domainValues.toArray();
		domainValues.forEach((domainValue: DomainValue) => {
			domainValue.rollbackAttributes();
		});
		this.currentDomain.rollbackAttributes();
		this.transitionToRoute("app.frame-base.domains");
	}

	async removeDeletedDomainValues(): Promise<void> {
		this.initialDomainValues.forEach(async (domainValue: DomainValue) => {
			const isDeleted =
				this.currentDomain.domainValues.find((dv: DomainValue) => dv.id === domainValue.id) === undefined;
			if (isDeleted) {
				await domainValue.destroyRecord();
			}
		});
	}
}

declare module "@ember/controller" {
	interface Registry {
		"app/frame-base/domains/edit": AppFrameBaseDomainsEdit;
	}
}
