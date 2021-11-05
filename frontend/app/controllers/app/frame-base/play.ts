import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { Frame, FrameBase, Slot } from "knowledge-shell/models";
import BattleCore from "knowledge-shell/services/battle-core";
import BattleLogger from "knowledge-shell/services/battle-logger";
import IntlService from "ember-intl/services/intl";

export default class FrameBasePlayController extends Controller {
	@service intl!: IntlService;
	@service("battle-core") battleCore!: BattleCore;
	@service("battle-logger") battleLogger!: BattleLogger;

	@tracked current: number = 1;

	get panelObjects(): Frame[] {
		return this.battleCore.panelObjects;
	}

	get battleField(): Frame {
		return this.battleCore.battleField;
	}

	get x(): number {
		return this.battleCore.x;
	}

	get y(): number {
		return this.battleCore.y;
	}

	get gameLog(): { name: string; children: any } {
		const battleTitle = this.intl.t("pages.frame_editor.testing.battle.log");
		const rootNode = { name: battleTitle, children: this.battleLogger.fullLog };
		return rootNode;
	}

	initGame(frameBase: FrameBase): void {
		this.battleCore.frameBase = frameBase;
		this.battleCore.initialize();
	}

	@action
	playStep(): void {
		this.battleCore.playStep(this.current);
		this.current += 1;
	}

	@action
	addMoveObjectOnField(object: Frame | Slot, ops: any): void {
		const cellName = ops.target.attrs.slotName.value;
		if (object instanceof Frame) {
			this.battleCore.addObjectOnField(object, cellName);
		}
		if (object instanceof Slot) {
			this.battleCore.moveObjectOnField(object, cellName);
		}
	}
}

declare module "@ember/controller" {
	interface Registry {
		"frame-base/play": FrameBasePlayController;
	}
}
