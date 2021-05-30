import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { FrameBase } from "knowledge-shell/models";
import IntlService from "ember-intl/services/intl";
import Swal, { SweetAlertResult } from "sweetalert2";

export default class KnowledgeBases extends Controller {
	@service intl!: IntlService;
	@tracked search = "";

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
						frameBase,
					})
					.save();
			});
	}

	@action
	viewKb(kb: FrameBase): void {
		this.transitionToRoute("app.frame-base.editor", kb.id);
	}

	@action
	playKb(kb: FrameBase): void {
		this.transitionToRoute("app.frame-base.play", kb.id);
	}

	@action
	editKb(kb: FrameBase): void {
		kb.isEditing = true;
	}

	@action
	deleteKb(kb: FrameBase): void {
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
	saveKb(kb: FrameBase): void {
		kb.isEditing = false;
		kb.save();
	}

	@action
	cancelChanges(kb: FrameBase): void {
		kb.isEditing = false;
		kb.rollbackAttributes();
	}
}

declare module "@ember/controller" {
	interface Registry {
		"knowledge-bases": KnowledgeBases;
	}
}
