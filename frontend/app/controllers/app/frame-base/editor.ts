import Controller from "@ember/controller";
import { isEmpty } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";
import { FrameBase, Frame, Domain, Slot } from "knowledge-shell/models";

export default class FrameBaseEditor extends Controller {
	get frameBase(): FrameBase {
		return this.model;
	}

	get frames(): Frame[] {
		return this.frameBase.frames;
	}

	get domains(): Domain[] {
		return this.frameBase.domains;
	}

	@tracked search = "";

	get canReorderSlots(): boolean {
		const selectedFrameHasParent = this.selectedFrame?.hasParent;
		return isEmpty(this.search) && !selectedFrameHasParent;
	}

	get selectedFrame(): Frame | undefined {
		return this.frames.findBy("isSelected", true);
	}

	@action
	addFrame(coordinates: { x: number; y: number }): void {
		this.frameBase.addFrame(coordinates);
	}

	@action
	saveFrame(): void {
		const { selectedFrame } = this;
		if (selectedFrame) {
			selectedFrame.save();
			/* slots can be reordered and we must propagate changes to children */
			selectedFrame.ownSlots
				.filter((sl) => sl.hasDirtyAttributes)
				.forEach((sl) => this.frameBase.propagateSlotChanged(sl));
			selectedFrame.isSelected = false;
			this.resetFrames();
		}
	}

	@action
	cancelFrameChanges(): void {
		const { selectedFrame } = this;
		if (selectedFrame) {
			selectedFrame.rollbackAttributes();
			selectedFrame.isSelected = false;
			this.resetFrames();
		}
	}

	@action
	deleteFrame(frame: Frame): void {
		// eslint-disable-next-line no-alert
		const shouldBeDeleted = window.confirm(`Are you sure you want to delete ${frame.name}?`);
		if (shouldBeDeleted) {
			this.frameBase.deleteFrame(frame);
		}
	}

	@action
	unsetParent(frame: Frame): void {
		this.frameBase.setParent(frame, null);
		frame.save();
	}

	@action
	setParent(childFrame: Frame, parentFrame: Frame): void {
		this.frameBase.setParent(childFrame, parentFrame);
		childFrame.save();
	}

	@action
	changeFramePosition(frame: Frame, newPosition: { x: number; y: number }): void {
		const framePosition = frame.position;
		if (framePosition) {
			framePosition.setProperties({
				x: newPosition.x,
				y: newPosition.y,
			});
			framePosition.save();
		}
	}

	@action
	addSlot(): void {
		if (this.selectedFrame) {
			this.frameBase.addSlot(this.selectedFrame);
		}
	}

	@action
	saveSlotChanges(slot: Slot): void {
		slot.save();
		if (slot.hasProduction) {
			slot.production.save();
		}
		this.frameBase.propagateSlotChanged(slot);
	}

	@action
	cancelSlotChanges(slot: Slot): void {
		slot.rollbackAttributes();
		if (slot.hasProduction) {
			slot.production.rollbackAttributes();
		}
	}

	@action
	deleteSlot(slot: Slot): void {
		// eslint-disable-next-line no-alert
		const shouldBeDeleted = window.confirm(`Are you sure you want to delete ${slot.name}?`);
		if (shouldBeDeleted) {
			if (this.selectedFrame) {
				this.frameBase.removeSlot(this.selectedFrame, slot);
			}
		}
	}

	@action
	reorderSlots(reorderedSlots: Slot[]): void {
		reorderedSlots.forEach((slot: Slot, index: number) => {
			slot.order = index;
		});
	}

	/**
	 * @see https://stackoverflow.com/questions/57468327/why-wont-my-tracked-array-update-in-ember-octane
	 */
	resetFrames(): void {
		set(this.frameBase, "frames", this.frames);
	}
}

declare module "@ember/controller" {
	interface Registry {
		"frame-base/editor": FrameBaseEditor;
	}
}
