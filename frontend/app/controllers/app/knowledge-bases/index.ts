import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { KnowledgeBase, KnowledgeBaseType } from "knowledge-shell/models";
import IntlService from "ember-intl/services/intl";
import Swal, { SweetAlertResult } from "sweetalert2";

export default class AppKnowledgeBasesIndex extends Controller {
	queryParams = ["sortBy", "sortDirection", "page"];

	@tracked page = 1;
	@tracked filter = "";
	@tracked sortBy = "";
	@tracked sortDirection = "";

	@service intl!: IntlService;

	get knowledgeBases(): KnowledgeBase[] {
		const frameBases = this.store.peekAll("frame-base");
		const productionBases = this.store.peekAll("production-base");
		const knowledgeBases = [...frameBases.toArray(), ...productionBases.toArray()];
		return knowledgeBases;
	}

	@action
	addKb() {
		this.transitionToRoute("app.knowledge-bases.new");
	}

	@action
	viewKb(kb: KnowledgeBase): void {
		switch (kb.baseType) {
			case KnowledgeBaseType.Frame:
				this.transitionToRoute("app.frame-base.editor", kb.id);
				break;
			case KnowledgeBaseType.Production:
				this.transitionToRoute("app.production-base.rules", kb.id);
				break;
			default:
				break;
		}
	}

	@action
	playKb(kb: KnowledgeBase): void {
		this.transitionToRoute(`app.frame-base.play`, kb.id);
	}

	@action
	editKb(kb: KnowledgeBase): void {
		this.transitionToRoute("app.knowledge-bases.edit", kb.id);
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
		"app/knowledge-bases/index": AppKnowledgeBasesIndex;
	}
}
