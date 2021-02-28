import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class Application extends Route {
  @service session: any;

  beforeModel() {
    if (this.session.isAuthenticated) {
      this.transitionTo("app.knowledge-bases");
    } else {
      this.transitionTo("login");
    }
  }
}
