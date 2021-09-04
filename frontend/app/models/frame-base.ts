import { hasMany } from "@ember-data/model";
import { inject as service } from "@ember/service";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { hash } from "rsvp";
import FrameObserver from "knowledge-shell/services/frame-observer";
import KnowledgeBase from "./knowledge-base";
import Frame from "./frame";
import Domain from "./domain";
import Slot from "./slot";
import KnowledgeBaseType from "./knowledge-base-type";

export default class FrameBase extends KnowledgeBase {
	public get knowledgeBaseType(): KnowledgeBaseType {
		return KnowledgeBaseType.Frame;
	}

	@service("frame-observer") frameObserver!: FrameObserver;

	@hasMany("frame", { async: false })
	frames!: Frame[];

	@computed("domains")
	get frameDomain(): Domain {
		return this.domains.findBy("isReadOnly", true) as Domain;
	}

	@tracked
	isEditing!: boolean;

	/**
	 * @see
	 * why - https://embermap.com/notes/83-the-case-against-async-relationships
	 * filtering - https://json-api-dotnet.github.io/JsonApiDotNetCore/usage/filtering.html
	 * @summary Returns all data related to current base
	 */
	public loadData() {
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
				filter: `equals(knowledgeBase.id,'${this.id}')`,
				include: "knowledgeBase",
			}),
			domainValueString: this.store.query("domain-value-string", {
				filter: `equals(domain.knowledgeBase.id,'${this.id}')`,
				include: "domain",
			}),
			domainValueNumbers: this.store.query("domain-value-number", {
				filter: `equals(domain.knowledgeBase.id,'${this.id}')`,
				include: "domain",
			}),
			domainValueFrames: this.store.query("domain-value-frame", {
				filter: `equals(domain.knowledgeBase.id,'${this.id}')`,
				include: "domain,value",
			}),
		});
	}

	public getFrame(frameName: string): Frame {
		return this.frames.find((frame: Frame) => frame.name === frameName) as Frame;
	}

	public getDomain(domainName: string): Domain {
		return this.domains.find((domain: Domain) => domain.name === domainName) as Domain;
	}

	public selectFrame(frameId: string): void {
		this.frameObserver.selectFrame(this, frameId);
	}

	public deSelectFrames(): void {
		this.frameObserver.deSelectFrames(this);
	}

	public addFrame({ x, y }: { x: number; y: number }): void {
		this.frameObserver.addFrame(this, { x, y });
	}

	public addFrameSample(framePrototype?: Frame): Frame {
		return this.frameObserver.addFrameSample(this, framePrototype);
	}

	public addEmptySlot(): Slot {
		return this.frameObserver.addEmptySlot();
	}

	public setParent(frame: Frame, parentFrame: Frame | null): void {
		this.frameObserver.setParent(frame, parentFrame);
	}

	public deleteFrame(frame: Frame): Promise<Frame> {
		return this.frameObserver.deleteFrame(this, frame);
	}

	public addSlot(frame: Frame): void {
		this.frameObserver.addSlot(frame);
	}

	public removeSlot(frame: Frame, slot: Slot): Promise<Slot> {
		return this.frameObserver.removeSlot(frame, slot);
	}

	public propagateSlotChanged(slot: Slot): void {
		this.frameObserver.propagateSlotChanged(slot);
	}
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"frame-base": FrameBase;
	}
}
