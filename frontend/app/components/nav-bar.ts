import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import type IntlService from "ember-intl/services/intl";

export default class NavBar extends Component {
  @service session!: any;
  @service intl!: IntlService;

  @tracked isMenuOpen!: boolean;

  get supportedLanguages(): string[] {
    const locales = this.intl.locales;
    return locales;
  }

  @action
  setLanguage(selectedLanguage: string) {
    this.intl.setLocale(selectedLanguage);
  }

  @action
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
