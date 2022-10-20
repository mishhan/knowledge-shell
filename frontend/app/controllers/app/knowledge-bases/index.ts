import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { KnowledgeBase, KnowledgeBaseType } from "knowledge-shell/models";
import IntlService from "ember-intl/services/intl";
import Swal, { SweetAlertResult } from "sweetalert2";
import sort from "knowledge-shell/utils/sort";

export default class AppKnowledgeBasesIndexController extends Controller {
	@service intl!: IntlService;
	queryParams = ["sortBy", "sortDirection", "page", "perPage"];

	@tracked page = 1;
	@tracked perPage = 5;
	@tracked filter = "";
	@tracked sortBy = "";
	@tracked sortDirection = "";

	@tracked totalRecordCount = 0;
	perPageOptions = [5, 10, 50];

	@tracked currentlyLoading!: boolean;

	get knowledgeBases(): KnowledgeBase[] {
		const frameBases = this.store.peekAll("frame-base");
		const productionBases = this.store.peekAll("production-base");
		const knowledgeBases = [...frameBases.toArray(), ...productionBases.toArray()];
		const sortedKnowledgeBases = sort(knowledgeBases, this.sortBy, this.sortDirection);
		return sortedKnowledgeBases;
	}

	get lastPageNumber(): number {
		return Math.ceil(this.totalRecordCount / this.perPage);
	}

	get nextPageNumber(): number {
		const nextPageNumber = this.page === this.lastPageNumber ? this.lastPageNumber : this.page + 1;
		return nextPageNumber;
	}

	get prevPageNumber(): number {
		const prevPageNumber = this.page === 1 ? this.page : this.page - 1;
		return prevPageNumber;
	}

	get canGoForward(): boolean {
		return this.page < this.lastPageNumber;
	}

	get canGoBackward(): boolean {
		return this.page > 1;
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
				this.transitionToRoute("app.production-base.index", kb.id);
				break;
			default:
				break;
		}
	}

	@action
	playKb(kb: KnowledgeBase): void {
		switch (kb.baseType) {
			case KnowledgeBaseType.Frame:
				this.transitionToRoute("app.frame-base.play", kb.id);
				break;
			case KnowledgeBaseType.Production:
				this.transitionToRoute("app.production-base.testing", kb.id);
				break;
			default:
				break;
		}
	}

	@action
	editKb(kb: KnowledgeBase): void {
		this.transitionToRoute("app.knowledge-bases.edit", kb.id);
	}

	@action
	deleteKb(kb: KnowledgeBase): void {
		Swal.fire({
			icon: "warning",
			text: this.intl.t("form.delete_confirmation", { item: kb.name }),
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
	setSortParameters(sortBy: string, sortDirection: string): void {
		this.sortBy = sortBy;
		this.sortDirection = sortDirection;
	}

	@action
	setPerPageOption(perPageOption: number): void {
		this.perPage = perPageOption;
	}
}
