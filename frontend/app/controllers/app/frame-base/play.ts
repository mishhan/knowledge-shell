import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { computed, action } from "@ember/object";
import { Frame, FrameBase, Slot } from "knowledge-shell/models";
import BattleCore from "knowledge-shell/services/battle-core";
import BattleLogger from "knowledge-shell/services/battle-logger";

export default class FrameBasePlayController extends Controller {
  @service("battle-core") battleCore!: BattleCore;
  @service("battle-logger") battleLogger!: BattleLogger;
  
  @computed.oneWay("model") frameBase!: FrameBase;

  @computed.oneWay("battleCore.panelObjects") panelObjects!: Frame[];
  @computed.oneWay("battleCore.battleField") battleField!: Frame;
  @computed.oneWay("battleCore.x") x!: number;
  @computed.oneWay("battleCore.y") y!: number;

  initGame(): void {
    this.battleCore.frameBase = this.frameBase;
    this.battleCore.initialize();
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
