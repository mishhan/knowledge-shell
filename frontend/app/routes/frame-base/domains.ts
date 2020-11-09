import Route from "@ember/routing/route";

export default class FrameBaseDomains extends Route {
  model() {
    return this.modelFor("frame-base");
  }
}
