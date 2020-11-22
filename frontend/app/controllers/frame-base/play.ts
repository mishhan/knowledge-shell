import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { computed, action } from "@ember/object";
import { getOwner } from "@ember/application";
import { Frame, FrameBase, Slot } from "knowledge-shell/models";
import BattleCore from "knowledge-shell/objects/battle-game/battle-core";

export default class FrameBasePlayController extends Controller {
  @computed.oneWay("model") frameBase!: FrameBase;

  @computed.oneWay("battleCore.panelObjects") panelObjects!: Frame[];
  @computed.oneWay("battleCore.battleField") battleField!: Frame;
  @computed.oneWay("battleCore.x") x!: number;
  @computed.oneWay("battleCore.y") y!: number;

  @computed("x", "y", function () {
    return `grid-template-columns: repeat(${this.x}, 100px); grid-template-rows: repeat(${this.y}, 100px)`;
  })
  fieldStyle!: string;

  @tracked battleCore!: BattleCore;

  initGame(): void {
    const owner: any = getOwner(this);
    this.battleCore = BattleCore.create({
      owner: owner,
      frameBase: this.frameBase
    });
    this.battleCore.initialize();
  }

  destroyGame(): void {
    this.battleCore.destroy();
  }


  @action
  playStep(): void {
    this.battleCore.playStep();
  }

  @action
  addMoveObjectOnField(object: Frame | Slot, ops: any): void {
    const cellName = ops.target.attrs.slotName.value;
    if (object instanceof Frame) {
      this.battleCore.addObjectOnField(object, cellName);
    }
    if (object instanceof Slot) {
      this.battleCore.moveObjectOnField(object, cellName);
    }
  }
}

declare module "@ember/controller" {
  interface Registry {
    "frame-base/play": FrameBasePlayController;
  }
}
