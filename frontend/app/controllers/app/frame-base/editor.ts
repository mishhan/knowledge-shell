import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action, set } from "@ember/object";
import { FrameBase, Frame, Domain, Slot } from "knowledge-shell/models";
import IntlService from "ember-intl/services/intl";
import Swal, { SweetAlertResult } from "sweetalert2";

export default class FrameBaseEditorController extends Controller {
	@service intl!: IntlService;

	get frameBase(): FrameBase {
		return this.model;
	}

	get frames(): Frame[] {
		return this.frameBase.frames;
	}

	get rootFrames(): Frame[] {
		const { frames } = this.frameBase;
		const rootFrames = frames.filter((frame: Frame) => !frame.hasParent);
		return rootFrames;
	}

	get domains(): Domain[] {
		return this.frameBase.domains;
	}

	get selectedFrame(): Frame | undefined {
		const selectedFrame = this.frames.findBy("isSelected", true);
		return selectedFrame;
	}

	get selectedSlot(): Slot | undefined {
		const selectedSlot = this.selectedFrame?.ownSlots.findBy("isSelected", true);
		return selectedSlot;
	}

	@action
	selectFrame(frameName: string): void {
		this.frameBase.selectFrame(frameName);
	}

	@action
	selectSlot(slot: Slot): void {
		slot.isSelected = true;
	}

	@action
	deSelectFrames(): void {
		this.frameBase.deSelectFrames();
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
		Swal.fire({
			icon: "warning",
			text: this.intl.t("common.delete_confirmation", { item: frame.name }),
			allowOutsideClick: false,
			showConfirmButton: true,
			showCancelButton: true,
		}).then((result: SweetAlertResult) => {
			if (result.isConfirmed) {
				this.frameBase.deleteFrame(frame).then(() => {
					Swal.fire({
						icon: "success",
					});
				});
			}
		});
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
	async saveSlotChanges(slot: Slot): Promise<void> {
		await slot.save();
		if (slot.hasProduction) {
			await slot.production.save();
		}
		this.frameBase.propagateSlotChanged(slot);
		slot.isSelected = false;
	}

	@action
	cancelSlotChanges(slot: Slot): void {
		slot.rollbackAttributes();
		if (slot.hasProduction) {
			slot.production.rollbackAttributes();
		}
		slot.isSelected = false;
	}

	@action
	deleteSlot(slot: Slot): void {
		Swal.fire({
			icon: "warning",
			text: this.intl.t("common.delete_confirmation", { item: slot.name }),
			allowOutsideClick: false,
			showConfirmButton: true,
			showCancelButton: true,
		}).then((result: SweetAlertResult) => {
			if (result.isConfirmed) {
				if (this.selectedFrame) {
					this.frameBase.removeSlot(this.selectedFrame, slot).then(() => {
						Swal.fire({
							icon: "success",
						});
					});
				}
			}
		});
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
