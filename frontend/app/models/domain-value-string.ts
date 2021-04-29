import { attr } from "@ember-data/model";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import DomainValue from "./domain-value";

export default class DomainValueString extends DomainValue {
	@attr("string") value!: string;

	@computed.oneWay("value")
	valueStr!: string;
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"domain-value-string": DomainValueString;
	}
}
