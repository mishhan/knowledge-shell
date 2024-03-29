import Model, { attr, belongsTo } from "@ember-data/model";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import Variable from "./variable";
import ProductionBase from "./production-base";

export default class Rule extends Model {
	@attr("string") name!: string;
	@attr("string") reason!: string;
	@attr("string") premise!: string;
	@attr("string") consequence!: string;
	@attr("number", { defaultValue: 0 }) order!: number;

	@belongsTo("production-base", { async: false })
	productionBase!: ProductionBase;

	@computed("premise", "consequence")
	get fullRule(): string {
		return `IF ${this.premise} THEN ${this.consequence}`;
	}

	/**
	 * Gets variable from production base by name
	 * @param {string} variableName - variable name
	 * @returns {Variable} variable
	 */
	public getVariable(variableName: string): Variable | undefined {
		const lowerCaseVariableName = variableName.toLowerCase();
		const baseVariable = this.productionBase.variables.find(
			(variable: Variable) => variable.name.toLowerCase() === lowerCaseVariableName,
		);
		return baseVariable;
	}
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		rule: Rule;
	}
}
