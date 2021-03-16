import DS from "ember-data";
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";
import { computed } from "@ember/object";
import ENV from "knowledge-shell/config/environment";

export default class Application extends DS.JSONAPIAdapter.extend(DataAdapterMixin) {
  host = ENV.APP.host;
  namespace = ENV.APP.namespace;

  @computed("session.{data.authenticated.access_token,isAuthenticated}")
  get headers() {
    const headers = { "Authorization": "" };
    if (this.session.isAuthenticated) {
      headers["Authorization"] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }

}

declare module "ember-data/types/registries/adapter" {
  export default interface AdapterRegistry {
    "application": Application;
  }
}
