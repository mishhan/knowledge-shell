import JSONAPIAdapter from "@ember-data/adapter/json-api";
// @ts-ignore
// eslint-disable-next-line ember/no-mixins
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from "@ember/object";
import { v4 } from "uuid";
import ENV from "knowledge-shell/config/environment";

// @ts-ignore
export default class Application extends JSONAPIAdapter.extend(DataAdapterMixin) {
	host = ENV.APP.host;

	namespace = ENV.APP.namespace;

	@computed("session.{data.authenticated.access_token,isAuthenticated}")
	get headers() {
		const headers = { Authorization: "" };
		if (this.session.isAuthenticated) {
			headers.Authorization = `Bearer ${this.session.data.authenticated.access_token}`;
		}

		return headers;
	}

	generateIdForRecord(): string {
		return v4();
	}
}

declare module "ember-data/types/registries/adapter" {
	export default interface AdapterRegistry {
		application: Application;
	}
}
