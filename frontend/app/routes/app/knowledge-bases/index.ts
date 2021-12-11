import Route from "@ember/routing/route";
import ArrayProxy from "@ember/array/proxy";
import { KnowledgeBase } from "knowledge-shell/models";

export default class extends Route {
	queryParams = {
		page: {
			refreshModel: true,
		},
		sortBy: {
			refreshModel: true,
		},
		sortDirection: {
			refreshModel: true,
		},
	};

	model(params: { page: number; sortBy: string; sortDirection: string }): ArrayProxy<KnowledgeBase> {
		const options = {};
		if (params.sortBy !== "") {
			// @ts-ignore
			options.sort = `${params.sortDirection === "asc" ? "" : "-"}${params.sortBy}`;
		}
		const knowledgeBases = this.store.query("knowledge-base", options);
		return knowledgeBases;
	}
}
