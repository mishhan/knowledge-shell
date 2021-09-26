import Route from "@ember/routing/route";
import ArrayProxy from "@ember/array/proxy";
import { KnowledgeBase } from "knowledge-shell/models";

export default class AppKnowledgeBasesIndex extends Route {
	model(): ArrayProxy<KnowledgeBase> {
		const knowledgeBases = this.store.findAll("knowledge-base");
		return knowledgeBases;
	}
}
