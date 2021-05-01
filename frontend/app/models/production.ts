import Model, { attr, belongsTo } from "@ember-data/model";
import Slot from "./slot";

export default class Production extends Model {
	@attr("string") text!: string;

	@belongsTo("slot", { async: false })
	slot!: Slot;
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		production: Production;
	}
}
