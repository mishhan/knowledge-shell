import Model, { attr, hasMany } from "@ember-data/model";
import { tracked } from "@glimmer/tracking";
import Domain from "./domain";
import KnowledgeBaseType from "./knowledge-base-type";

export default abstract class KnowledgeBase extends Model {
	@attr("string") name!: string;
	@attr("string") description!: string;

	public abstract get baseType(): KnowledgeBaseType;
	public get baseTypeName(): string {
		return KnowledgeBaseType[this.baseType];
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

	@tracked
	isEditing!: boolean;
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"knowledge-base": KnowledgeBase;
	}
}
