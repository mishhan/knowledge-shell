import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import type IntlService from "ember-intl/services/intl";

export default class Application extends Route {
  @service session: any;
  @service intl!: IntlService;

  beforeModel(): void {
    if (this.session.isAuthenticated) {
      this.transitionTo("app.knowledge-bases");
    } else {
      this.transitionTo("login");
    }
  }
}
