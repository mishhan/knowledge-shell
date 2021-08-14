import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import ENV from "knowledge-shell/config/environment";

export default class SignUp extends Controller {
	@service session!: any;
	@tracked isLoading!: boolean;
	@tracked serverErrorMessage!: string;

	@action
	async registr(userName: string, email: string, password: string) {
		try {
			this.isLoading = true;
			const response = await fetch(`${ENV.APP.host}${ENV.APP.namespace}/sign-up`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userName,
					email,
					password,
				}),
			});

			if (response.ok) {
				this.session.authenticate("authenticator:oauth2", userName, password);
			}
		} catch (error) {
			const errorJson = error.responseJSON;
			this.serverErrorMessage = errorJson;
		} finally {
			this.isLoading = false;
		}
	}
}

declare module "@ember/controller" {
	interface Registry {
		"sign-up": SignUp;
	}
}
