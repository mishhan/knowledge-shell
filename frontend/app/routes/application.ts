import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import type IntlService from "ember-intl/services/intl";

export default class Application extends Route {
	@service session: any;
	@service intl!: IntlService;

	beforeModel(transition: any): void {
		if (this.session.isAuthenticated) {
			const shouldRedirect = transition.intent.url === "/";
			if (shouldRedirect) {
				this.transitionTo("app.knowledge-bases");
			} else {
				this.transitionTo(transition.intent.url);
			}
		} else {
			this.transitionTo("sign-in");
		}
	}
}
