import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class SignIn extends Controller {
	@service session!: any;
	@tracked isLoading!: boolean;
	@tracked serverErrorMessage!: string;

	@action
	async authenticate(identification: string, password: string): Promise<void> {
		try {
			this.isLoading = true;
			await this.session.authenticate("authenticator:oauth2", identification, password);
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
		login: SignIn;
	}
}