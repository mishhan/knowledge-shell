import Model, { attr, belongsTo } from "@ember-data/model";
import Domain from "./domain";

export default abstract class DomainValue extends Model {
	@attr("number", { defaultValue: 0 }) order!: number;

	@belongsTo("domain", { async: false, inverse: "domainValues" })
	domain!: Domain;
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"domain-value": DomainValue;
	}
}
