import Controller from "@ember/controller";

export default class AppProductionBaseIndex extends Controller {}

declare module "@ember/controller" {
	interface Registry {
		"app/production-base/index": AppProductionBaseIndex;
	}
}
