import { hasMany } from "@ember-data/model";
import RSVP, { hash } from "rsvp";
import KnowledgeBase from "./knowledge-base";
import Variable from "./variable";
import Rule from "./rule";
import KnowledgeBaseType from "./knowledge-base-type";

export default class ProductionBase extends KnowledgeBase {
	public get baseType(): KnowledgeBaseType {
		return KnowledgeBaseType.Production;
	}

	@hasMany("variable", { async: false })
	variables!: Variable[];
	@hasMany("rule", { async: false })
	rules!: Rule[];

	public loadData(): RSVP.Promise<any> {
		return hash({
			rules: this.store.query("rule", {
				filter: `equals(productionBase.id,'${this.id}')`,
				include: "productionBase",
			}),
			variables: this.store.query("variable", {
				filter: `equals(productionBase.id,'${this.id}')`,
				include: "productionBase,domain",
			}),
			domains: this.store.query("domain", {
				filter: `equals(knowledgeBase.id,'${this.id}')`,
				include: "knowledgeBase",
			}),
			domainValueString: this.store.query("domain-value-string", {
				filter: `equals(domain.knowledgeBase.id,'${this.id}')`,
				include: "domain",
			}),
			domainValueNumbers: this.store.query("domain-value-number", {
				filter: `equals(domain.knowledgeBase.id,'${this.id}')`,
				include: "domain",
			}),
		});
	}
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"production-base": ProductionBase;
	}
}
