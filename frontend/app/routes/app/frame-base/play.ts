import Route from "@ember/routing/route";
import Model from "@ember-data/model";
import { action } from "@ember/object";
import { FrameBase } from "knowledge-shell/models";

export default class extends Route {
	setupController(controller: any, model: FrameBase, transition: any): void {
		super.setupController(controller, model, transition);
		controller.initGame(model);
	}

	@action
	willTransition() {
		["frame", "slot", "domain-value-frame", "domain-value-string", "production"].forEach((modelName: string) => {
			const unsavedRecords = this.store.peekAll(modelName).filter((model: Model) => model.isNew);
			unsavedRecords.forEach((model: Model) => model.unloadRecord());
		});
	}
}
