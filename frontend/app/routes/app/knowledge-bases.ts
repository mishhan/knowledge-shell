import Route from "@ember/routing/route";
import DS from "ember-data";
import FrameBase from "knowledge-shell/models/frame-base";

export default class KnowledgeBases extends Route {
  model(): DS.PromiseArray<FrameBase> {
    return this.store.findAll("frame-base");
  }
}
