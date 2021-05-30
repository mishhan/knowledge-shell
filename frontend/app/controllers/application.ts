import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class Application extends Controller {
	@service session!: any;

	@action
	invalidateSession(): void {
		this.session.invalidate();
	}
}

declare module "@ember/controller" {
	interface Registry {
		application: Application;
	}
}
