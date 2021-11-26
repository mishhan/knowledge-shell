import Controller from "@ember/controller";
import { action } from "@ember/object";
import { DomainType, KnowledgeBase, KnowledgeBaseType } from "knowledge-shell/models";

export default class KnowledgeBasesNewController extends Controller {
	defaultKbType = KnowledgeBaseType.Frame;

	@action
	saveKb(kbName: string, kbDescription: string, kbType: KnowledgeBaseType) {
		const isFrameBase = kbType === KnowledgeBaseType.Frame;
		const knowledgeBase = isFrameBase
			? this.store.createRecord("frame-base")
			: this.store.createRecord("production-base");
		knowledgeBase.name = kbName;
		knowledgeBase.description = kbDescription;
		knowledgeBase
			.save()
			.then((kb: KnowledgeBase) => {
				if (isFrameBase) {
					this.store
						.createRecord("domain", {
							name: "Frame",
							isReadonly: true,
							domainType: DomainType.Frame,
							knowledgeBase: kb,
						})
						.save();
				}
			})
			.then(() => this.transitionToRoute("app.knowledge-bases"));
	}

	@action
	cancelKbChanges() {
		this.transitionToRoute("app.knowledge-bases");
	}
}
