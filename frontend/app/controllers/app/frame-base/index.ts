import Controller from "@ember/controller";
import { Frame, Slot } from "knowledge-shell/models";

export default class FrameBaseIndexController extends Controller {
	get frameCount(): number {
		return this.model.frames.length;
	}

	get domainCount(): number {
		return this.model.domains.length;
	}

	get slotCount(): number {
		let slotCount = 0;
		this.model.frames.forEach((frame: Frame) => {
			slotCount += frame.ownSlots.length;
		});

		return slotCount;
	}

	get uniqueSlotCount(): number {
		let uniqueSlotCount = 0;
		this.model.frames.forEach((frame: Frame) => {
			uniqueSlotCount += frame.ownSlots.filter((slot: Slot) => !slot.isInherited).length;
		});

		return uniqueSlotCount;
	}
}
