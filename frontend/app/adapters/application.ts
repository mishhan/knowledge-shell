import DS from "ember-data";
import ENV from "knowledge-shell/config/environment";

export default class Application extends DS.JSONAPIAdapter {
  host = ENV.APP.host as string;
  namespace = ENV.APP.namesapce as string;
}

declare module "ember-data/types/registries/adapter" {
  export default interface AdapterRegistry {
    "application": Application;
  }
}
