import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { DomainType, KnowledgeBase } from "knowledge-shell/models";
import IntlService from "ember-intl/services/intl";
import Swal, { SweetAlertResult } from "sweetalert2";

export default class KnowledgeBases extends Controller {
	@service intl!: IntlService;
	@tracked search = "";

	kbRoutes = ["frame-base", "production-base"];

	get knowledgeBases(): KnowledgeBase[] {
		const frameBases = this.store.peekAll("frame-base");
		const productionBases = this.store.peekAll("production-base");
		const knowledgeBases = [...frameBases.toArray(), ...productionBases.toArray()];
		return knowledgeBases;
	}

	@action
	addKb() {
		this.store
			.createRecord("frame-base", { name: "New KB" })
			.save()
			.then((frameBase) => {
				// should be done on server..
				this.store
					.createRecord("domain", {
						name: "Frame",
						isReadOnly: true,
						domainType: DomainType.Frame,
						knowledgeBase: frameBase,
					})
					.save();
			});
	}

	@action
	viewKb(kb: KnowledgeBase): void {
		const kbRoute = this.kbRoutes[kb.baseType];
		this.transitionToRoute(`app.${kbRoute}.editor`, kb.id);
	}

	@action
	playKb(kb: KnowledgeBase): void {
		const kbRoute = this.kbRoutes[kb.baseType];
		this.transitionToRoute(`app.${kbRoute}.play`, kb.id);
	}

	@action
	editKb(kb: KnowledgeBase): void {
		kb.isEditing = true;
	}

	@action
	deleteKb(kb: KnowledgeBase): void {
		Swal.fire({
			icon: "warning",
			text: this.intl.t("common.delete_confirmation", { item: kb.name }),
			allowOutsideClick: false,
			showConfirmButton: true,
			showCancelButton: true,
		}).then((result: SweetAlertResult) => {
			if (result.isConfirmed) {
				kb.destroyRecord().then(() => {
					Swal.fire({
						icon: "success",
					});
				});
			}
		});
	}

	@action
	saveKb(kb: KnowledgeBase): void {
		kb.isEditing = false;
		kb.save();
	}

	@action
	cancelChanges(kb: KnowledgeBase): void {
		kb.isEditing = false;
		kb.rollbackAttributes();
	}
}

declare module "@ember/controller" {
	interface Registry {
		"knowledge-bases": KnowledgeBases;
	}
}
