import Model, { attr, belongsTo } from "@ember-data/model";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import Domain from "./domain";
import ProductionBase from "./production-base";
import VariableType from "./variable-type";

export default class Variable extends Model {
	@attr("string") name!: string;
	@attr("string") description!: string;
	@attr("string") question!: string;
	@attr("number", { defaultValue: 0 }) variableType!: VariableType;

	@belongsTo("domain", { async: false })
	domain!: Domain;

	@belongsTo("production-base", { async: false })
	productionBase!: ProductionBase;

	@computed("variableType")
	get variableTypeName(): string {
		return VariableType[this.variableType];
	}
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		variable: Variable;
	}
}
