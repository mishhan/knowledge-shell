import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { Frame, FrameBase, Slot } from "knowledge-shell/models";

export default class FrameBaseIndex extends Controller {
  @computed.oneWay("model") frameBase!: FrameBase;

  get baseInformation(): { name: string, value: any }[] {
    const informationSlots = [
      { name: "Frame Count", value: this.frameCount },
      { name: "Domain Count", value: this.domainCount },
      { name: "Slot Count", value: this.slotCount },
      { name: "Unique Slot Count", value: this.uniqueSlotCount },
    ];

    return informationSlots;
  }

  get frameCount(): number {
    return this.frameBase.frames.length;
  }

  get domainCount(): number {
    return this.frameBase.domains.length;
  }

  get slotCount(): number {
    let slotCount = 0;
    this.frameBase.frames.forEach((frame: Frame) => {
      slotCount += frame.ownSlots.length;
    });

    return slotCount;
  }

  get uniqueSlotCount(): number {
    let uniqueSlotCount = 0;
    this.frameBase.frames.forEach((frame: Frame) => {
      uniqueSlotCount += frame.ownSlots.filter((slot: Slot) => !slot.isInherited).length;
    })

    return uniqueSlotCount;
  }
}

declare module "@ember/controller" {
  interface Registry {
    "frame-base/index": FrameBaseIndex;
  }
}
