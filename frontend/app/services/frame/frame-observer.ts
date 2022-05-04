import Service, { inject as service } from "@ember/service";
import Evented from "@ember/object/evented";
import Store from "@ember-data/store";
import IntlService from "ember-intl/services/intl";
import { Frame, FrameBase, Position, Slot } from "knowledge-shell/models";

export default class FrameObserver extends Service.extend(Evented) {
	@service intl!: IntlService;
	@service("store") store!: Store;

	public selectFrame(frameBase: FrameBase, frameId: string) {
		const { frames } = frameBase;
		const selectedFrame = frames.find((frame: Frame) => frame.id === frameId);
		if (selectedFrame) {
			this.deSelectFrames(frameBase);
			selectedFrame.isSelected = true;

			this.trigger("selectedFrameChanged");
		}
	}

	public deSelectFrames(frameBase: FrameBase): void {
		const { frames } = frameBase;
		frames.forEach((frame: Frame) => {
			frame.isSelected = false;
		});
	}

	public addFrame(frameBase: FrameBase, coordinates: { x: number; y: number }): void {
		this.store
			.createRecord("position", {
				x: coordinates.x,
				y: coordinates.y,
			})
			.save()
			.then((framePosition: Position) => {
				this.store
					.createRecord("frame", {
						name: this.intl.t("models.frame.default_name"),
						frameBase,
						position: framePosition,
					})
					.save()
					.then((frame: Frame) => {
						this.store
							.createRecord("domain-value-frame", {
								domain: frameBase.frameDomain,
								value: frame,
							})
							.save();
					});
			});
	}

	public addFrameSample(frameBase: FrameBase, framePrototype?: Frame): Frame {
		const sample: Frame = this.store.createRecord("frame", { isSample: true });
		if (framePrototype) {
			sample.name = `${framePrototype.name} #sample`;
			sample.parent = framePrototype;
			sample.frameBase = frameBase;
			framePrototype.ownSlots.forEach((sl: Slot) => {
				const inheritedSlot = this.store.createRecord("slot", {
					name: sl.name,
					order: sl.order,
					owner: sample,
					domain: sl.domain,
					value: sl.value,
					parent: sl,
				});
				if (sl.hasProduction) {
					inheritedSlot.production = this.store.createRecord("production", {
						text: sl.production.text,
					});
				}
			});
		}

		this.store.createRecord("domain-value-frame", {
			domain: frameBase.frameDomain,
			value: sample,
		});

		return sample;
	}

	public deleteFrame(frameBase: FrameBase, frame: Frame): Promise<Frame> {
		if (frame.hasChildren) {
			frame.children.forEach((child) => {
				this.setParent(child, null);
				child.save();
			});
		}
		if (frame.hasSlots) {
			frame.ownSlots.forEach((slot) => {
				this.removeSlot(frame, slot);
			});
		}
		frameBase.frameDomain?.domainValues.findBy("value", frame)?.unloadRecord();
		frame.position?.unloadRecord();
		return frame.destroyRecord();
	}

	public setParent(childFrame: Frame, parentFrame: Frame | null): void {
		childFrame.parent = parentFrame as Frame;
		this.propagateFrameParentChanged(childFrame);
	}

	public addEmptySlot(): Slot {
		return this.store.createRecord("slot");
	}

	public addSlot(frame: Frame): void {
		const newSlot = this.store.createRecord("slot", {
			name: this.intl.t("models.slot.default_name"),
			order: frame.ownSlots.length,
		});
		frame.ownSlots.pushObject(newSlot);
		newSlot.save();
		this.propagateFrameSlotAdded(frame, newSlot);
	}

	public removeSlot(frame: Frame, slot: Slot): Promise<Slot> {
		this.propagateFrameSlotRemoved(frame, slot);
		return slot.destroyRecord();
	}

	public async propagateSlotChanged(slot: Slot): Promise<void> {
		slot.children.forEach(async (child: Slot) => {
			child.setProperties({
				name: slot.name,
				order: slot.order,
				domain: slot.domain,
				value: slot.value,
			});

			if (slot.hasProduction) {
				if (child.hasProduction) {
					child.production.text = slot.production.text;
				} else {
					child.production = this.store.createRecord("production", {
						text: slot.production.text,
						slot: child,
					});
				}
				await child.production.save();
			}

			await this.propagateSlotChanged(child);
		});

		await slot.save();
	}

	private propagateFrameParentChanged(frame: Frame) {
		const currentParent = frame.parent;
		const inheritedSlots = frame.ownSlots.filter((slot) => slot.isInherited);
		inheritedSlots.forEach((slot) => slot.destroyRecord());

		if (currentParent) {
			currentParent.ownSlots.forEach((slotToInherit) => {
				const inheritedSlot = this.store.createRecord("slot", {
					name: slotToInherit.name,
					isInherited: true,
					order: slotToInherit.order,
					domain: slotToInherit.domain,
					value: slotToInherit.value,
					parent: slotToInherit,
				});

				frame.ownSlots.pushObject(inheritedSlot);
				inheritedSlot.save().then(() => {
					if (slotToInherit.hasProduction) {
						inheritedSlot.production = this.store.createRecord("production", {
							text: slotToInherit.production.text,
							slot: inheritedSlot,
						});
						inheritedSlot.production.save();
					}
				});
			});
		}

		frame.children.forEach((childFrame) => {
			this.propagateFrameParentChanged(childFrame);
		});
	}

	private propagateFrameSlotAdded(frame: Frame, slot: Slot) {
		frame.children.forEach((childFrame) => {
			const newSlot = this.store.createRecord("slot", {
				parent: slot,
				owner: childFrame,
				name: slot.name,
				order: frame.ownSlots.length,
				isInherited: true,
				domain: slot.domain,
				value: slot.value,
			});
			newSlot.save();

			this.propagateFrameSlotAdded(childFrame, newSlot);
		});
	}

	private propagateFrameSlotRemoved(frame: Frame, slot: Slot) {
		frame.children.forEach((childFrame) => {
			const childSlot = childFrame.ownSlots.find((ownSlot) => ownSlot.parent === slot);
			if (childSlot) {
				this.propagateFrameSlotRemoved(childFrame, childSlot);
				childSlot.destroyRecord();
			}
		});
	}
}

declare module "@ember/service" {
	interface Registry {
		"frame/frame-observer": FrameObserver;
	}
}
