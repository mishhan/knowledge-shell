import Route from "@ember/routing/route";
import { action } from "@ember/object";
import { DomainValue, FrameBase } from "knowledge-shell/models";

export default class extends Route {
	model(): any {
		const frameBase = this.modelFor("app.frame-base") as FrameBase;
		const { domains } = frameBase;
		const domain = this.store.createRecord("domain", {
			knowledgeBase: frameBase,
		});
		return {
			domain,
			domains,
		};
	}

	@action
	willTransition(): void {
		const model = this.controller.model.domain;
		const domainValues = model.domainValues.toArray();
		domainValues.forEach((domainValue: DomainValue) => {
			if (domainValue.get("hasDirtyAttributes")) {
				domainValue.rollbackAttributes();
			}
		});
		if (model?.get("hasDirtyAttributes")) {
			model.rollbackAttributes();
		}
	}
}
