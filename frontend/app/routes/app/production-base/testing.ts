import Route from "@ember/routing/route";
import AppProductionBaseTesting from "knowledge-shell/controllers/app/production-base/testing";

export default class extends Route {
	setupController(controller: AppProductionBaseTesting, model: any, transition: any): void {
		super.setupController(controller, model, transition);
		controller.initialize();
	}
}
