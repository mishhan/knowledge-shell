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
    const cellWidth = "100px";
    const cellHeight = "100px";
    return `grid-template-columns: repeat(${x}, ${cellWidth}); grid-template-rows: repeat(${y}, ${cellHeight})`;
  }
}
