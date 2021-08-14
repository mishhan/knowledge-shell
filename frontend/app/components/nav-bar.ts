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
		const { locales } = this.intl;
		return locales;
	}

	@action
	setLanguage(selectedLocale: string) {
		this.intl.setLocale(selectedLocale);
	}

	@action
	toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
	}

	@action
	async invalidateSession(): Promise<void> {
		this.session.invalidate();
	}
}
