import Model, { attr, hasMany } from "@ember-data/model";
import Domain from "./domain";
import KnowledgeBaseType from "./knowledge-base-type";

export default abstract class KnowledgeBase extends Model {
	@attr("string") name!: string;
	@attr("string") description!: string;

	public abstract get knowledgeBaseType(): KnowledgeBaseType;
	public get knowledgeBaseTypeName(): string {
		return KnowledgeBaseType[this.knowledgeBaseType];
	}

	@attr("date", {
		defaultValue() {
			return new Date();
		},
	})
	createdAt!: Date;

	@attr("date", {
		defaultValue() {
			return new Date();
		},
	})
	updatedAt!: Date;

	@hasMany("domain", { async: false })
	domains!: Domain[];
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"knowledge-base": KnowledgeBase;
	}
}
