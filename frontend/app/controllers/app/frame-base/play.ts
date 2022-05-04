import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { Frame, FrameBase, Slot } from "knowledge-shell/models";
import BattleCore from "knowledge-shell/services/frame/battle-core";
import IntlService from "ember-intl/services/intl";
import TreeInfoConverter from "knowledge-shell/services/tree-info-converter";

export default class FrameBasePlayController extends Controller {
	@service intl!: IntlService;
	@service("frame/battle-core") battleCore!: BattleCore;
	@service("tree-info-converter") treeInfoConverter!: TreeInfoConverter;

	@tracked currentStep = 1;

	gameObjectLog: { name: string; children: any[] } = {
		name: this.intl.t("pages.frame_editor.testing.battle.log"),
		children: [],
	};

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

	initGame(frameBase: FrameBase): void {
		this.battleCore.frameBase = frameBase;
		this.battleCore.initialize();
	}

	@action
	playStep(): void {
		this.battleCore.playStep();
		this.currentStep += 1;
		const gameObjectsLog = this.treeInfoConverter.convertFrameInference(this.battleCore.gameObjectsInfo);
		const currentBattleStepLog = {
			name: this.intl.t("pages.frame_editor.testing.battle.step", { number: this.currentStep }),
			children: gameObjectsLog,
		};
		this.gameObjectLog.children.pushObject(currentBattleStepLog);
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
