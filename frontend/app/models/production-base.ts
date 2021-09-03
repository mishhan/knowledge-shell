import { hasMany } from "@ember-data/model";
import KnowledgeBase from "./knowledge-base";
import Domain from "./domain";
import Variable from "./variable";
import Rule from "./rule";

export default class ProductionBase extends KnowledgeBase {
	@hasMany("domain", { async: false }) domains!: Domain[];
	@hasMany("variable", { async: false }) variables!: Variable[];
	@hasMany("rule", { async: false }) rules!: Rule[];
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"production-base": ProductionBase;
	}
}
