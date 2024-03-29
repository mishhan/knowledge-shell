import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import ENV from "knowledge-shell/config/environment";

export default class SignUpController extends Controller {
	@service session!: any;
	@tracked isLoading!: boolean;
	@tracked serverErrorMessage!: string;

	@action
	async registr(userName: string, email: string, password: string): Promise<void> {
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
				await this.session.authenticate("authenticator:oauth2", userName, password);
			}
		} catch (error) {
			const errorJson = error.responseJSON === undefined ? error : error.responseJSON;
			this.serverErrorMessage = errorJson;
		} finally {
			this.isLoading = false;
		}
	}
}
