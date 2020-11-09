import Route from "@ember/routing/route";

export default class Application extends Route {
  beforeModel() {
    this.transitionTo("knowledge-bases");
  }
}
