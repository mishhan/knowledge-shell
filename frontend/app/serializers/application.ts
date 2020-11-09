import DS from "ember-data";

export default class Application extends DS.JSONAPISerializer {
  keyForAttribute(key: string): string {
    return key;
  }
  keyForRelationship(key: string): string {
    return key;
  }
}

declare module "ember-data/types/registries/serializer" {
  export default interface SerializerRegistry {
    "application": Application;
  }
}
