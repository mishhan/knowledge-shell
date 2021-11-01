import Service from "@ember/service";
import { isEmpty, isEqual } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import { DomainValueFrame, DomainValueString, Frame, FrameBase, Slot } from "knowledge-shell/models";
import Interpretter from "knowledge-shell/interpretter/frame-production/interpretter";

export default class FrameProductionEngine extends Service {
	private readonly productionInterpretter: Interpretter = new Interpretter();
	@tracked frameBase!: FrameBase;

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

		let isAttached = false;
		// eslint-disable-next-line no-restricted-syntax
		for (const prototypeSampleSlot of prototypeSampleSlots) {
			const sampleSlot = frameSample.getSlot(prototypeSampleSlot.name);
			isAttached = this.attachToSlot(prototypeSampleSlot, sampleSlot);
			if (!isAttached) break;
		}

		if (!isAttached) {
			return undefined;
		}
		return prototypeSample;
	}

	private attachToSlot(slotPrototype: Slot, sampleSlot: Slot | undefined): boolean {
		if (slotPrototype.hasProduction) {
			const result = this.productionInterpretter.evaluate(slotPrototype.production);
			if (isEmpty(result)) return false;

			let newValue: DomainValueString | DomainValueFrame | undefined;
			if (typeof result === "string") {
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
		"frame-production-engine": FrameProductionEngine;
	}
}
