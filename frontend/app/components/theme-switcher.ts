import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ThemeSwitcher extends Component {
	themeKey = "theme";

	@tracked
	selectedTheme = "default";
	themes = ["default", "materia", "pulse", "spacelab"];

	themeStyles!: { themeName: string; styles: NodeListOf<Element> }[];

	@action
	initialize(): void {
		this.themeStyles = [];
		this.themes.forEach((themeName: string) => {
			const styles = document.querySelectorAll(`link[rel=stylesheet][media*=prefers-theme][media*=${themeName}]`);
			this.themeStyles.pushObject({
				themeName,
				styles,
			});
		});

		const savedTheme = this.getSavedTheme();
		if (savedTheme !== null) {
			this.setTheme(savedTheme);
		}
	}

	@action
	setTheme(theme: string): void {
		this.selectedTheme = theme;
		this.switchTheme(theme);
		this.saveTheme(theme);
	}

	switchTheme(selectedTheme: string): void {
		this.themeStyles.forEach((theme) => {
			if (theme.themeName === selectedTheme) {
				[...theme.styles].forEach((link: HTMLLinkElement) => {
					link.media = "all";
				});
			} else {
				[...theme.styles].forEach((link: HTMLLinkElement) => {
					link.media = "not all";
				});
			}
		});
	}

	getSavedTheme(): string | null {
		const savedScheme = localStorage.getItem(this.themeKey);
		return savedScheme;
	}

	saveTheme(scheme: string): void {
		localStorage.setItem(this.themeKey, scheme);
	}
}
