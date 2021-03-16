import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class NavBar extends Component {
  @service session!: any;
  @tracked isMenuOpen!: boolean;

  @action
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
