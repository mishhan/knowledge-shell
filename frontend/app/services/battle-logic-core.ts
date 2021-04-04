import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { isEmpty, isEqual } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import { DomainValueFrame, DomainValueString, Frame, FrameBase, Slot } from "knowledge-shell/models";
import BattleLogger from "./battle-logger";
import Interpretter from "knowledge-shell/interpretter/frame-production/interpretter";

export default class BattleLogicCore extends Service {
  private productionInterpretter!: Interpretter;
  
  @service("battle-logger") battleLogger!: BattleLogger;

  @tracked frameBase!: FrameBase;

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

    framePrototype.children.forEach((childPrototype: Frame) => {
      if (!childPrototype.isSample) {
        const attachedChildren = this.attachToFrameOrChildren(childPrototype, frameSample);
        result = result.concat(attachedChildren);
      }
    });

    return result;
  }

  /**
   * Creates sample based on framePrototype and attaches this sample to frameSample
   * @param framePrototype 
   * @param frameSample 
   * @returns true if prototypeSample is attached to frameSample
   */
   public attachToFrame(framePrototype: Frame, frameSample: Frame): Frame | undefined {
    const prototypeSample = this.frameBase.addFrameSample(framePrototype);
    const prototypeSampleSlots = prototypeSample.sortedSlots.toArray();

    this.battleLogger.addMessage(`Attaching frame [${prototypeSample.name}]: ${prototypeSample.getSlotNameValueCollection()}`);
    this.battleLogger.addMessage(`To ${frameSample.getSlotNameValueCollection()}`);

    let isAttached = false;
    for (const prototypeSampleSlot of prototypeSampleSlots) {
      const sampleSlot = frameSample.getSlot(prototypeSampleSlot.name);
      this.battleLogger.addMessage(`Attaching slot [${prototypeSampleSlot.name}]`);

      isAttached = this.attachToSlot(prototypeSampleSlot, sampleSlot);
      if (isAttached) {
        this.battleLogger.addMessage(`Slot [${prototypeSampleSlot.name}] is attached. Value: [${(prototypeSampleSlot.value as DomainValueString).valueStr}]`);
      } else {
        this.battleLogger.addMessage(`Slot ${prototypeSampleSlot.name} isn't attached`);
        break;
      }
    }

    if (!isAttached) {
      this.battleLogger.addMessage(`[${prototypeSample.name}] isn't attached to [${frameSample.name}]`);
      return undefined;
    }
    this.battleLogger.addMessage(`[${prototypeSample.name}] is attached to [${frameSample.name}]`);
    return prototypeSample;
  }

  private attachToSlot(slotPrototype: Slot, sampleSlot: Slot | undefined): boolean {
    if (slotPrototype.hasProduction) {
      this.battleLogger.addMessage(`Slot [${slotPrototype.name}] has production: ${slotPrototype.production.text}`);

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

    if (sampleSlot) {
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

declare module "@ember/service" {
  interface Registry {
    "battle-logic-core": BattleLogicCore;
  }
}
