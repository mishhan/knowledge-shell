import { attr } from "@ember-data/model";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import DomainValue from "./domain-value";

export default class DomainValueNumber extends DomainValue {
	@attr("number") value!: number;

	@computed("value")
	get valueStr(): string {
		return this.value.toString();
	}
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"domain-value-number": DomainValueNumber;
	}
}
