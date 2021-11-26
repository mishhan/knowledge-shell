import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from "@ember/object";
import { Domain, DomainValue } from "knowledge-shell/models";
import { allSettled } from "rsvp";
import IntlService from "ember-intl/services/intl";
import Swal, { SweetAlertResult } from "sweetalert2";

export default class FrameBaseDomainsController extends Controller {
	@service intl!: IntlService;
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
		Swal.fire({
			icon: "warning",
			text: this.intl.t("common.delete_confirmation", { item: domain.name }),
			allowOutsideClick: false,
			showConfirmButton: true,
			showCancelButton: true,
		}).then((result: SweetAlertResult) => {
			if (result.isConfirmed) {
				const promises = [];
				domain.domainValues.forEach((domainValue: DomainValue) => {
					promises.push(domainValue.destroyRecord());
				});
				this.model.domains.removeObject(domain);
				promises.push(domain.destroyRecord());
				allSettled(promises).then(() => {
					Swal.fire({
						icon: "success",
					});
				});
			}
		});
	}
}
