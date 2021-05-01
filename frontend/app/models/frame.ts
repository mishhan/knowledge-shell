import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import { isEqual } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import FrameBase from "./frame-base";
import Slot from "./slot";
import Domain from "./domain";
import Position from "./position";
import DomainValueString from "./domain-value-string";

export default class Frame extends Model {
	@attr("string") name!: string;

	@attr("boolean", { defaultValue: false }) isSample!: boolean;

	@belongsTo("frame-base", { async: false })
	frameBase!: FrameBase;

	@belongsTo("frame", { async: false, inverse: "children" })
	parent!: Frame;

	@hasMany("frame", { async: false, inverse: "parent" })
	children!: Frame[];

	@hasMany("slot", { async: false, inverse: "owner" })
	ownSlots!: Slot[];

	@belongsTo("position", { async: false })
	position!: Position;

	@computed("ownSlots.[]")
	get sortedSlots(): Slot[] {
		return this.ownSlots.sortBy("order");
	}

	@computed("sortedSlots")
	get slotNames(): string {
		return `[${this.sortedSlots.map((slot: Slot) => slot.name).join(", ")}]`;
	}

	@computed("ownSlots.@each.value", "sortedSlots")
	get slotValues(): string {
		const nameValueCollection = this.sortedSlots.map((slot: Slot) => {
			const slotName = slot.name;
			const slotValue = slot.value ? (slot.value as DomainValueString).valueStr : "none";
			return `${slotName}: ${slotValue}`;
		});

		const slotValues = nameValueCollection.join("\n");
		return slotValues;
	}

	@computed.oneWay("frameBase.frameDomain")
	domain!: Domain;

	@computed.notEmpty("children")
	hasChildren!: boolean;

	@computed.notEmpty("parent")
	hasParent!: boolean;

	@computed.notEmpty("ownSlots")
	hasSlots!: boolean;

	@tracked
	isSelected!: boolean;

	public isParentOf(childFrame: Frame): boolean {
		let current = childFrame;
		while (current.hasParent) {
			if (isEqual(current.parent, this)) {
				return true;
			}

			if (current.parent) {
				current = current.parent;
			}
		}

		return false;
	}

	public pathLengthTo(destinationFrame: Frame): number {
		let pathLength: number = 0;
		let current: Frame = this;
		while (current.hasParent) {
			if (isEqual(current.parent, destinationFrame)) {
				return pathLength;
			}

			if (current.parent) {
				current = current.parent;
			}
			pathLength += 1;
		}

		return -1;
	}

	public getSlot(slotName: string): Slot | undefined {
		const frameSlot = this.ownSlots.find((slot: Slot) => isEqual(slot.name, slotName));
		return frameSlot;
	}

	public getSlotNameValueCollection(): string {
		const nameValueCollection = this.sortedSlots.map((slot: Slot) => {
			const slotName = slot.name;
			const slotValue = slot.value ? (slot.value as DomainValueString).valueStr : "none";
			return `${slotName} = ${slotValue}`;
		});
		const slotValues = `[${nameValueCollection.join(", ")}]`;
		return slotValues;
	}
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		frame: Frame;
	}
}
