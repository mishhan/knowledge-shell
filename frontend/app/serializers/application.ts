import JSONAPISerializer from "@ember-data/serializer/json-api";

export default class Application extends JSONAPISerializer {
	keyForAttribute(key: string): string {
		return key;
	}

	keyForRelationship(key: string): string {
		return key;
	}
}

declare module "ember-data/types/registries/serializer" {
	export default interface SerializerRegistry {
		application: Application;
	}
}
