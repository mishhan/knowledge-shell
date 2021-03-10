import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class Login extends Controller {
  @service session!: any;

  @tracked identification!: string;
  @tracked password!: string;
  @tracked errorMessage!: string;

  @action
  async authenticate(): Promise<void> {
    const { identification, password } = this;
    try {
      await this.session.authenticate('authenticator:oauth2', identification, password);
    } catch(error) {
      const errorJson = error.responseJSON;
      this.errorMessage = errorJson.errorText;
    }
  }

}


declare module "@ember/controller" {
  interface Registry {
    "login": Login;
  }
}
