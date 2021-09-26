import Route from "@ember/routing/route";
import { KnowledgeBase } from "knowledge-shell/models";

export default class AppKnowledgeBasesEdit extends Route {
	async model({ base_id }: { base_id: string }): Promise<KnowledgeBase> {
		const knowledgeBase = await this.store.findRecord("knowledge-base", base_id);
		return knowledgeBase;
	}
}
