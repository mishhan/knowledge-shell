import EmberObject from "@ember/object";
import { isEmpty, isEqual } from "@ember/utils";
import Interpretter from "knowledge-shell/interpretter/frame-production/interpretter";
import { DomainValueFrame, DomainValueString, Frame, FrameBase, Slot } from "knowledge-shell/models";

export default class BattleLogicCore extends EmberObject {
  private productionInterpretter!: Interpretter;
  public frameBase!: FrameBase;

  init() {
    super.init();
    this.productionInterpretter = new Interpretter();
  }

  public attachToFrameOrChildren(framePrototype: Frame, frameSample: Frame): Frame[] {
    let result: Frame[] = [];
    const attachedFrame = this.attachToFrame(framePrototype, frameSample);
    if (attachedFrame) {
      result.pushObject(attachedFrame);
    }

    framePrototype.children.forEach((childFrame: Frame) => {
      if (!childFrame.isSample) {
        const attachedChildren = this.attachToFrameOrChildren(childFrame, frameSample);
        result = result.concat(attachedChildren);
      }
    });

    return result;
  }

  public attachToFrame(framePrototype: Frame, frameSample: Frame): Frame | undefined {
    const sampleFrame: Frame = this.frameBase.addFrameSample(framePrototype);
    let isAttached = false;
    const sampleFrameSlots = sampleFrame.sortedSlots.toArray();
    for (const sampleFrameSlot of sampleFrameSlots) {
      const sampleSlot = frameSample.getSlot(sampleFrameSlot.name);
      isAttached = this.attachToSlot(sampleFrameSlot, sampleSlot);
      if (!isAttached) break;

    }

    if (!isAttached) {
      return undefined;
    }

    return sampleFrame;
  }

  private attachToSlot(slotPrototype: Slot, sampleSlot: Slot): boolean {
    if (slotPrototype.hasProduction) {
      const result = this.productionInterpretter.evaluate(slotPrototype.production);
      if (isEmpty(result)) return false;

      let newValue: DomainValueString | DomainValueFrame | undefined;
      if (typeof(result) === "string") {
        newValue = slotPrototype.domain.getDomainValueFrameByFrameName(result);
      } else {
        newValue = result;
      }

      if (isEmpty(newValue)) return false;

      if (!isEmpty(slotPrototype.value) && slotPrototype.value instanceof DomainValueFrame) {
        if (!slotPrototype.value.value.isParentOf((newValue as DomainValueFrame).value)) {
          return false;
        }
      }

      if (newValue) {
        slotPrototype.value = newValue;
        return !isEmpty(slotPrototype.value);
      }
    }

    if (!isEmpty(sampleSlot)) {
      if (!isEqual(slotPrototype.domain, sampleSlot.domain)) {
        return false;
      }

      if ((slotPrototype.value as DomainValueFrame)?.value instanceof Frame) {
        const slotPrototypeValue = (slotPrototype.value as DomainValueFrame).value;
        const sampleSlotValue = (sampleSlot.value as DomainValueFrame).value;

        if (!slotPrototypeValue.isParentOf(sampleSlotValue)) {
          return false;
        }

        const attachedSubFrame = this.attachToFrame(slotPrototypeValue, sampleSlotValue);
        if (attachedSubFrame) {
          slotPrototype.value = attachedSubFrame.domain.getDomainValueFrameByFrameName(attachedSubFrame.name);
        }
      } else {
        slotPrototype.value = sampleSlot.value;
      }
    }

    return !isEmpty(slotPrototype.value);
  }
}