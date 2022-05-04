import Route from "@ember/routing/route";
import { action } from "@ember/object";
import ArrayProxy from "@ember/array/proxy";
import { KnowledgeBase } from "knowledge-shell/models";
import AppKnowledgeBasesIndexController from "knowledge-shell/controllers/app/knowledge-bases";

export default class extends Route {
	queryParams = {
		page: {
			refreshModel: true,
		},
		perPage: {
			refreshModel: true,
		},
		sortBy: {
			refreshModel: true,
		},
		sortDirection: {
			refreshModel: true,
		},
	};

	async model(params: {
		page: number;
		perPage: number;
		sortBy: string;
		sortDirection: string;
	}): Promise<ArrayProxy<KnowledgeBase>> {
		const options = {};
		if (params.sortBy !== "") {
			// @ts-ignore
			options.sort = `${params.sortDirection === "asc" ? "" : "-"}${params.sortBy}`;
		}
		// @ts-ignore
		options.page = { size: params.perPage, number: params.page };

		/* clear store before reloading models */
		this.store.unloadAll("production-base");
		this.store.unloadAll("frame-base");

		const knowledgeBases = await this.store.query("knowledge-base", options);
		return knowledgeBases;
	}

	setupController(controller: AppKnowledgeBasesIndexController, model: any, transition: any): void {
		super.setupController(controller, model, transition);
		controller.totalRecordCount = model.meta["total-resources"];
	}

	@action
	loading(transition: any): void {
		const controller = this.controllerFor("app.knowledge-bases.index") as AppKnowledgeBasesIndexController;
		if (controller) {
			controller.currentlyLoading = true;

			transition.finally(function () {
				controller.currentlyLoading = false;
			});
		}
	}
}
