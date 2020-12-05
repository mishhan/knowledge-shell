import Model, { attr, hasMany } from "@ember-data/model";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { hash } from "rsvp";
import FrameObserver from "knowledge-shell/services/frame-observer";
import { Frame, Domain, Slot } from ".";

export default class FrameBase extends Model {
  @service("frame-observer") frameObserver!: FrameObserver;

  @attr("string") name!: string;
  @attr("string") description!: string;
  @attr("date", {
    defaultValue() {
      return new Date();
    }
  }) createdAt!: Date;

  @attr("date", {
    defaultValue() {
      return new Date();
    },
  })
  updatedAt!: Date;

  @hasMany("frame", { async: false })
  frames!: Frame[];

  @hasMany("domain", { async: false })
  domains!: Domain[];

  @computed("domains")
  get frameDomain() : Domain | undefined {
    return this.domains.findBy("isReadOnly", true);
  }

  @tracked
  isEditing!: boolean;

  /**
   * @see
   * why - https://embermap.com/notes/83-the-case-against-async-relationships
   * filtering - https://json-api-dotnet.github.io/JsonApiDotNetCore/usage/filtering.html
   * @summary Returns all data related to current base
   */
  loadData() {
    return hash({
      frames: this.store.query("frame", {
        filter: `equals(frameBase.id,'${this.id}')`,
        include: "frameBase,parent,children,position",
      }),
      slots: this.store.query("slot", {
        filter: `equals(owner.frameBase.id,'${this.id}')`,
        include: "owner,parent,children,domain,value,production",
      }),
      domains: this.store.query("domain", {
        filter: `equals(frameBase.id,'${this.id}')`,
        include: "frameBase",
      }),
      domainValueString: this.store.query("domain-value-string", {
        filter: `equals(domain.frameBase.id,'${this.id}')`,
        include: "domain",
      }),
      domainValueFrames: this.store.query("domain-value-frame", {
        filter: `equals(domain.frameBase.id,'${this.id}')`,
        include: "domain,value",
      }),
    });
  }

  getFrame(frameName: string): Frame {
    return this.frames.find((frame: Frame) => frame.name === frameName) as Frame;
  }

  getDomain(domainName: string): Domain {
    return this.domains.find((domain: Domain) => domain.name === domainName) as Domain;
  }

  addFrame({ x, y }: { x: number, y: number }): void {
    this.frameObserver.addFrame(this, { x, y });
  }

  addFrameSample(framePrototype?: Frame): Frame {
    return this.frameObserver.addFrameSample(this, framePrototype);
  }

  addEmptySlot(): Slot {
    return this.frameObserver.addEmptySlot();
  }

  setParent(frame: Frame, parentFrame: Frame | null): void {
    this.frameObserver.setParent(frame, parentFrame);
  }

  deleteFrame(frame: Frame): void {
    this.frameObserver.deleteFrame(this, frame);
  }

  addSlot(frame: Frame): void {
    this.frameObserver.addSlot(frame);
  }

  removeSlot(frame: Frame, slot: Slot): void {
    this.frameObserver.removeSlot(frame, slot);
  }

  propagateSlotChanged(slot: Slot): void {
    this.frameObserver.propagateSlotChanged(slot);
  }
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    "frame-base": FrameBase;
  }
}
