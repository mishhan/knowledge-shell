import Model, { attr, belongsTo } from "@ember-data/model";
import ProductionBase from "./production-base";

export default class Rule extends Model {
	@attr("string") name!: string;
	@attr("string") reason!: string;
	@attr("string") premise!: string;
	@attr("string") consequence!: string;
	@attr("number", { defaultValue: 0 }) order!: number;

	@belongsTo("production-base", { async: false })
	productionBase!: ProductionBase;
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		rule: Rule;
	}
}
