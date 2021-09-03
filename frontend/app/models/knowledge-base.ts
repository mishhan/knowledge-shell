import Model, { attr } from "@ember-data/model";

export default class KnowledgeBase extends Model {
	@attr("string") name!: string;
	@attr("string") description!: string;

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
}

declare module "ember-data/types/registries/model" {
	export default interface ModelRegistry {
		"knowledge-base": KnowledgeBase;
	}
}
