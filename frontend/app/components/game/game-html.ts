import Component from "@glimmer/component";
import { Frame } from "knowledge-shell/models";

interface GameArgs {
	x: number;
	y: number;
	panelObjects: Frame[];
	battleField: Frame;
	playStep: () => void;
	addMoveObjectOnField: () => void;
}

export default class GameHtml extends Component<GameArgs> {
	readonly defaultHeroAvatar = "/assets/warrior.svg";

	readonly defaultCellImage = "/assets/grass.svg";

	get fieldStyle(): string {
		const { x, y } = this.args;
		return `grid-template-columns: repeat(${x}, 1fr); grid-template-rows: repeat(${y}, 1fr)`;
	}
}
