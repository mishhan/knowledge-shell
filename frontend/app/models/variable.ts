import Model, { attr, belongsTo } from "@ember-data/model";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import Domain from "./domain";
import ProductionBase from "./production-base";
import VariableType from "./variable-type";
import DomainValue from "./domain-value";

export default class Variable extends Model {
	@attr("string") name!: string;
	@attr("string") description!: string;
	@attr("string") question!: string;
	@attr("number", { defaultValue: VariableType.Requested }) variableType!: VariableType;

	@belongsTo("domain", { async: false })
	domain!: Domain;

	@belongsTo("production-base", { async: false })
	productionBase!: ProductionBase;

	@computed("variableType")
	get variableTypeName(): string {
		return VariableType[this.variableType];
	}

	@computed.oneWay("domain.name")
	domainName!: string;

	@tracked value!: DomainValue | null;

	@computed.notEmpty("value")
	hasValue!: boolean;
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		variable: Variable;
	}
}
