import { set } from "@ember/object";
import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { not, notEmpty } from "@ember/object/computed";
import { tracked } from "@glimmer/tracking";
import Domain from "./domain";
import DomainValue from "./domain-value";
import Frame from "./frame";
import Production from "./production";

export default class Slot extends Model {
	@attr("string") name!: string;

	@attr("boolean", { defaultValue: false }) isInherited!: boolean;

	@attr("number") order!: number;

	@belongsTo("frame", { async: false, inverse: "ownSlots" })
	owner!: Frame;

	@belongsTo("slot", { async: false, inverse: "children" })
	parent!: Slot;

	@hasMany("slot", { async: false, inverse: "parent" })
	children!: Slot[];

	@belongsTo("domain", { async: false })
	domain!: Domain;

	@belongsTo("domain-value", { async: false, polymorphic: true })
	value!: DomainValue;

	@belongsTo("production", { async: false })
	production!: Production;

	@notEmpty("production")
	hasProduction!: boolean;

	@not("isInherited")
	canEditName!: boolean;

	@not("isInherited")
	canEditDomain!: boolean;

	@tracked
	isSelected!: boolean;

	public addProduction(): void {
		const production: Production = this.store.createRecord("production");
		set(this, "production", production);
	}

	public deleteProduction(): void {
		if (this.production.get("isNew")) {
			this.production.rollbackAttributes();
		} else {
			this.production.destroyRecord();
		}
	}
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		slot: Slot;
	}
}
