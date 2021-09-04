import { hasMany } from "@ember-data/model";
import KnowledgeBase from "./knowledge-base";
import Variable from "./variable";
import Rule from "./rule";
import KnowledgeBaseType from "./knowledge-base-type";

export default class ProductionBase extends KnowledgeBase {
	public get knowledgeBaseType(): KnowledgeBaseType {
		return KnowledgeBaseType.Production;
	}

	@hasMany("variable", { async: false })
	variables!: Variable[];
	@hasMany("rule", { async: false })
	rules!: Rule[];
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"production-base": ProductionBase;
	}
}
