import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import FrameBase from "knowledge-shell/models/frame-base";

export default class KnowledgeBases extends Controller {
  @tracked search = "";

  @action
  addKb() {
    this.store.createRecord("frame-base", { name: "New KB" })
    .save()
    .then((frameBase) => {
      //should be done on server..
      this.store.createRecord("domain", {
        name: "Frame",
        isReadOnly: true,
        frameBase: frameBase,
      })
      .save();
    });
  }

  @action
  viewKb(kb: FrameBase): void {
    this.transitionToRoute("frame-base.editor", kb.id);
  }

  @action
  playKb(kb: FrameBase): void {
    this.transitionToRoute("frame-base.play", kb.id);
  }

  @action
  editKb(kb: FrameBase): void {
    kb.isEditing = true;
  }

  @action
  deleteKb(kb: FrameBase): void {
    const shouldBeDeleted = window.confirm(`Are you sure you want to delete ${kb.name}?`);
    if (shouldBeDeleted) {
      kb.destroyRecord();
    }
  }

  @action
  saveKb(kb: FrameBase): void {
    kb.isEditing = false;
    kb.save();
  }

  @action
  cancelChanges(kb: FrameBase): void {
    kb.isEditing = false;
    kb.rollbackAttributes();
  }
}

declare module "@ember/controller" {
  interface Registry {
    "knowledge-bases": KnowledgeBases;
  }
}
