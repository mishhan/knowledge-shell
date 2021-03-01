import Route from "@ember/routing/route";
import Model from "@ember-data/model";
import { action } from "@ember/object";
import FrameBasePlayController from "knowledge-shell/controllers/app/frame-base/play";

export default class FrameBasePlay extends Route {
  setupController(controller: FrameBasePlayController, model: any, transition: any): void {
    super.setupController(controller, model, transition);
    controller.initGame();
  }

  @action
  willTransition(){
    (<FrameBasePlayController>this.controller).destroyGame();
    [
      "frame",
      "slot",
      "domain-value-frame",
      "domain-value-string",
      "production",
    ].forEach((modelName: string) => {
      const unsavedRecords = this.store.peekAll(modelName).filter((model: Model) => model.isNew);
      unsavedRecords.forEach((model: Model) => model.unloadRecord());
    });
  }
}
