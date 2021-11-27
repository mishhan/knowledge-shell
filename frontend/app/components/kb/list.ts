import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

interface KbListArgs {}

export default class KbList extends Component<KbListArgs> {
	@tracked filter = "";
}
