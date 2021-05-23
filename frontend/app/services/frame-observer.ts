import Service, { inject as service } from "@ember/service";
import Store from "@ember-data/store";
import Frame from "knowledge-shell/models/frame";
import FrameBase from "knowledge-shell/models/frame-base";
import Position from "knowledge-shell/models/position";
import Slot from "knowledge-shell/models/slot";

const DEFAULT_NAMES = { frame: "New Frame", slot: "New Slot" };

export default class FrameObserver extends Service {
	@service("store") store!: Store;

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
						name: DEFAULT_NAMES.frame,
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

	public deleteFrame(frameBase: FrameBase, frame: Frame): void {
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
		frame.destroyRecord();
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
			name: DEFAULT_NAMES.slot,
			order: frame.ownSlots.length,
		});
		frame.ownSlots.pushObject(newSlot);
		newSlot.save();
		this.propagateFrameSlotAdded(frame, newSlot);
	}

	public removeSlot(frame: Frame, slot: Slot): void {
		this.propagateFrameSlotRemoved(frame, slot);
		slot.destroyRecord();
	}

	public propagateSlotChanged(slot: Slot): void {
		slot.children.forEach((child: Slot) => {
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
				child.production.save();
			}

			this.propagateSlotChanged(child);
		});

		slot.save();
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
		"frame-observer": FrameObserver;
	}
}
