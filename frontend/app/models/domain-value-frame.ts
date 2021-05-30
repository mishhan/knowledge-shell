import { belongsTo } from "@ember-data/model";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import DomainValue from "./domain-value";
import Frame from "./frame";

export default class DomainValueFrame extends DomainValue {
	@belongsTo("frame", { async: false })
	value!: Frame;

	@computed.oneWay("value.name")
	valueStr!: string;
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"domain-value-frame": DomainValueFrame;
	}
}
