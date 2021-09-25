import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
import { isEqual } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import DomainType from "./domain-type";
import DomainValue from "./domain-value";
import DomainValueFrame from "./domain-value-frame";
import DomainValueString from "./domain-value-string";
import DomainValueNumber from "./domain-value-number";
import Frame from "./frame";
import KnowledgeBase from "./knowledge-base";

export default class Domain extends Model {
	@attr("string") name!: string;
	@attr("string") description!: string;
	@attr("number", { defaultValue: DomainType.String }) domainType!: DomainType;
	@attr("boolean", { defaultValue: false }) isReadOnly!: boolean;

	@belongsTo("knowledge-base", { async: false, polymorphic: true })
	knowledgeBase!: KnowledgeBase;

	@hasMany("domain-value", { async: false, inverse: "domain", polymorphic: true })
	domainValues!: DomainValue[];

	@computed("domainValues.[]")
	get domainValuesOrdered(): DomainValue[] {
		return this.domainValues.sortBy("order");
	}

	@computed.oneWay("domainValues.length")
	length!: number;

	@computed("domainType")
	get domainTypeName(): string {
		return DomainType[this.domainType];
	}

	@tracked
	isEditing!: boolean;

	public getDomainValue(value: string | number): DomainValue {
		switch (this.domainType) {
			case DomainType.String: {
				return this.domainValues.find((dv: DomainValueString) => isEqual(dv.value, value)) as DomainValueString;
			}
			case DomainType.Number: {
				return this.domainValues.find((dv: DomainValueNumber) => isEqual(dv.value, value)) as DomainValueNumber;
			}
			case DomainType.Frame: {
				return this.domainValues.find((dv: DomainValueFrame) => isEqual(dv.valueStr, value)) as DomainValueFrame;
			}
			default: {
				throw Error();
			}
		}
	}

	public getDomainValueFrameByFrameName(frameName: string): DomainValueFrame {
		return this.domainValues.find((dv: DomainValueFrame) => isEqual(dv.valueStr, frameName)) as DomainValueFrame;
	}

	public getDomainValueStringByName(valueName: string): DomainValueString {
		return this.domainValues.find((dv: DomainValueString) => isEqual(dv.value, valueName)) as DomainValueString;
	}

	public getDomainValueFrameByFrame(frame: Frame): DomainValueFrame {
		return this.domainValues.find((dv: DomainValueFrame) => isEqual(dv.value, frame)) as DomainValueFrame;
	}
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		domain: Domain;
	}
}
