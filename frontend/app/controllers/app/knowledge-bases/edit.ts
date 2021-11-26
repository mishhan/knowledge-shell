import Controller from "@ember/controller";
import { action } from "@ember/object";
import { KnowledgeBase } from "knowledge-shell/models";

export default class KnowledgeBasesEditController extends Controller {
	@action
	saveKb(kbName: string, kbDescription: string) {
		const knowledgeBase: KnowledgeBase = this.model;
		knowledgeBase.setProperties({
			name: kbName,
			description: kbDescription,
		});
		knowledgeBase.save().then(() => this.transitionToRoute("app.knowledge-bases"));
	}

	@action
	cancelKbChanges() {
		this.transitionToRoute("app.knowledge-bases");
	}
}
