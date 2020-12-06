import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
import { computed } from "@ember/object";
import { isEqual } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import { FrameBase, Slot, Domain, Position, DomainValueString } from ".";

export default class Frame extends Model {
  @attr("string") name!: string;

  @attr("boolean", { defaultValue: false }) isSample!: boolean;

  @belongsTo("frame-base", { async: false })
  frameBase!: FrameBase;

  @belongsTo("frame", { async: false, inverse: "children" })
  parent!: Frame | null;

  @hasMany("frame", { async: false, inverse: "parent" })
  children!: Frame[];

  @hasMany("slot", { async: false, inverse: "owner" })
  ownSlots!: Slot[];

  @belongsTo("position", { async: false })
  position!: Position | null;

  @computed("ownSlots.[]")
  get sortedSlots(): Slot[] {
    return this.ownSlots.sortBy("order");
  }

  @computed("sortedSlots")
  get slotNames(): string {
    return `[${this.sortedSlots.map((slot: Slot) => slot.name).join(", ")}]`;
  }

  @computed("ownSlots.@each.value")
  get slotValues(): string {
    let slotValues = "";
    for (const slot of this.sortedSlots) {
      slotValues += `${slot.name}: ${(slot.value as DomainValueString).valueStr}\n`;
    }
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
    while(current.hasParent) {
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
    while(current.hasParent) {
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

  public getSlot(slotName: string): Slot {
    return this.ownSlots.find((slot) => isEqual(slot.name, slotName)) as Slot;
  }
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "frame": Frame;
  }
}
