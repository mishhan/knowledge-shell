import Service, { inject as service } from "@ember/service";
import { isEmpty } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import IntlService from "ember-intl/services/intl";
import {
	Domain,
	DomainValue,
	DomainValueFrame,
	DomainValueNumber,
	DomainValueString,
	Frame,
	FrameBase,
	Slot,
} from "knowledge-shell/models";
import getRandomInt from "knowledge-shell/utils/get-random-int";
import BattleLogger from "./battle-logger";
import BattleLogicCore from "./battle-logic-core";

const BATTLE_SETTINGS = {
	fieldFrameName: "Game Field",
	freeCellFrameName: "Empty Cell",
	cellName: "Cell",

	xDomainName: "X",
	yDomainName: "Y",

	pictureSlotName: "Picture",
	agentSlotName: "Agent",
	resultSlotName: "Result",

	baseSituation: "Situation",
	baseHero: "Character",
};

export default class BattleCore extends Service {
	@service intl!: IntlService;
	@service("battle-logger") battleLogger!: BattleLogger;
	@service("battle-logic-core") battleLogicCore!: BattleLogicCore;

	@tracked frameBase!: FrameBase;

	get frames(): Frame[] {
		return this.frameBase.frames;
	}

	get domains(): Domain[] {
		return this.frameBase.domains;
	}

	get frameDomain(): Domain {
		return this.frameBase.frameDomain;
	}

	@tracked panelObjects: Frame[] = [];
	@tracked gameObjects: Frame[] = [];
	@tracked x!: number;
	@tracked y!: number;
	@tracked battleField!: Frame;
	@tracked freeCell!: Frame;

	public initialize(): void {
		this.battleLogicCore.frameBase = this.frameBase;
		this.x = this.frameBase.getDomain(BATTLE_SETTINGS.xDomainName).length;
		this.y = this.frameBase.getDomain(BATTLE_SETTINGS.yDomainName).length;
		this.battleField = this.frameBase.getFrame(BATTLE_SETTINGS.fieldFrameName);
		this.freeCell = this.frameBase.getFrame(BATTLE_SETTINGS.freeCellFrameName);

		this.battleLogger.clearLog();
		this.initializePanel();
		this.initializeField();
	}

	public addObjectOnField(panelObject: Frame, cellName: string): void {
		const battleCell = this.battleField.getSlot(cellName);
		if (battleCell) {
			const { x, y } = this.getXY(cellName);
			const frameSample = this.frameBase.addFrameSample(panelObject);

			const frameSampleX = frameSample.getSlot(BATTLE_SETTINGS.xDomainName);
			if (frameSampleX) {
				frameSampleX.value = this.frameBase.getDomain(BATTLE_SETTINGS.xDomainName).getDomainValue(x);
			}

			const frameSampleY = frameSample.getSlot(BATTLE_SETTINGS.yDomainName);
			if (frameSampleY) {
				frameSampleY.value = this.frameBase.getDomain(BATTLE_SETTINGS.yDomainName).getDomainValue(y);
			}

			const nullSlots = frameSample.ownSlots.filter((sl) => isEmpty(sl.value));
			nullSlots.forEach((nullSlot: Slot) => {
				const number = getRandomInt(0, nullSlot.domain.length - 1);
				nullSlot.value = nullSlot.domain.domainValuesOrdered.objectAt(number) as DomainValue;
			});

			this.gameObjects.pushObject(frameSample);
			battleCell.value = this.frameDomain.getDomainValueFrameByFrame(frameSample);
		}
	}

	public moveObjectOnField(gameObjectCell: Slot, newCellName: string): void {
		const battleCell = this.battleField.getSlot(newCellName);
		if (battleCell) {
			const targetCellValue = (battleCell.value as DomainValueFrame).value;
			const sourceCellValue = (gameObjectCell.value as DomainValueFrame).value;

			const targetCellValueX = targetCellValue.getSlot(BATTLE_SETTINGS.xDomainName);
			const targetCellValueY = targetCellValue.getSlot(BATTLE_SETTINGS.yDomainName);
			const sourceCellValueX = sourceCellValue.getSlot(BATTLE_SETTINGS.xDomainName);
			const sourceCellValueY = sourceCellValue.getSlot(BATTLE_SETTINGS.yDomainName);
			if (targetCellValueX && targetCellValueY && sourceCellValueX && sourceCellValueY) {
				targetCellValueX.value = sourceCellValueX.value;
				targetCellValueY.value = sourceCellValueY.value;

				const { x, y } = this.getXY(newCellName);
				const xValue = this.frameBase.getDomain(BATTLE_SETTINGS.xDomainName).getDomainValue(x);
				const yValue = this.frameBase.getDomain(BATTLE_SETTINGS.yDomainName).getDomainValue(y);
				sourceCellValueX.value = xValue;
				sourceCellValueY.value = yValue;
			}

			gameObjectCell.value = this.frameDomain.getDomainValueFrameByFrame((battleCell.value as DomainValueFrame).value);
			battleCell.value = this.frameDomain.getDomainValueFrameByFrame(sourceCellValue);
		}
	}

	public playStep(stepNumber: number): boolean {
		const treeLog: { name: string; children: any[] } = {
			name: this.intl.t("battle.step", { number: stepNumber }),
			children: [],
		};

		let hasAttachedSituations = false;
		const baseSituation = this.frameBase.getFrame(BATTLE_SETTINGS.baseSituation);

		this.gameObjects.forEach((gameObject: Frame) => {
			const gameObjectLog: { name: string; children: any[] } = { name: gameObject.name, children: [] };

			const gameObjectSituation = this.frameBase.addFrameSample();
			const agentSlot = this.frameBase.addEmptySlot();

			agentSlot.setProperties({
				name: BATTLE_SETTINGS.agentSlotName,
				owner: gameObjectSituation,
				domain: this.frameDomain,
				value: this.frameDomain.getDomainValueFrameByFrame(gameObject),
			});

			const attachedSituations = this.battleLogicCore.attachToFrameOrChildren(baseSituation, gameObjectSituation);

			if (attachedSituations.length > 0) {
				const situationNames = attachedSituations.map((situation: Frame) => situation.name);
				// need to choose random situation..
				const chosenSituation = attachedSituations[0];

				gameObjectLog.children.pushObjects([
					{
						name: this.intl.t("battle.attached_situations", { count: attachedSituations.length }),
						children: situationNames.map((sitName: string) => {
							return { name: sitName, children: [] };
						}),
					},
					{
						name: this.intl.t("battle.chosen_situation", { situation: chosenSituation.name }),
						children: [],
					},
				]);

				treeLog.children.pushObject(gameObjectLog);

				/**
				 * what's going on here? :D
				 * we've got the situation
				 * we've got the result of this situation ('go left' for example)
				 * we're creating new agent frame
				 * we're creating new slot - agent and set his owner = agent frame (^^)
				 * we're attaching this new agent frame (with agent slot) to our attached situation result
				 * ^^ - production evaluation (slot values change)
				 */
				const resultSlot = chosenSituation.getSlot(BATTLE_SETTINGS.resultSlotName);
				if (resultSlot) {
					const result = (resultSlot.value as DomainValueFrame).value;
					const sampleAttachedAgent = this.frameBase.addFrameSample();
					const sampleAttachedAgentSlot = this.frameBase.addEmptySlot();

					sampleAttachedAgentSlot.setProperties({
						name: BATTLE_SETTINGS.agentSlotName,
						owner: sampleAttachedAgent,
						domain: this.frameDomain,
						value: this.frameDomain.getDomainValueFrameByFrame(gameObject),
					});

					this.battleLogicCore.attachToFrame(result, sampleAttachedAgent);

					hasAttachedSituations = true;
				}
			}
		});

		this.refreshField();
		this.battleLogger.addMessage(treeLog);

		return hasAttachedSituations;
	}

	private initializePanel(): void {
		this.panelObjects = this.frames.filter((frame: Frame) => this.isPanelObject(frame));
	}

	private initializeField(): void {
		this.battleField.sortedSlots.forEach((slot: Slot) => {
			const freeCellSample = this.frameBase.addFrameSample(this.freeCell);
			const { x, y } = this.getXY(slot.name);
			const freeCellX = freeCellSample.getSlot(BATTLE_SETTINGS.xDomainName);
			const freeCellY = freeCellSample.getSlot(BATTLE_SETTINGS.yDomainName);
			if (freeCellX && freeCellY) {
				freeCellX.value = this.frameBase.getDomain(BATTLE_SETTINGS.xDomainName).getDomainValue(x);
				freeCellY.value = this.frameBase.getDomain(BATTLE_SETTINGS.yDomainName).getDomainValue(y);
			}

			slot.value = this.frameDomain.getDomainValueFrameByFrame(freeCellSample);
		});
	}

	private refreshField(): void {
		this.initializeField();

		this.gameObjects.forEach((gameObject: Frame) => {
			const gameObjectSlotX = gameObject.getSlot(BATTLE_SETTINGS.xDomainName);
			const gameObjectSlotY = gameObject.getSlot(BATTLE_SETTINGS.yDomainName);
			if (gameObjectSlotX && gameObjectSlotY) {
				const xValue = (gameObjectSlotX.value as DomainValueNumber).valueStr;
				const yValue = (gameObjectSlotY.value as DomainValueNumber).valueStr;
				const fieldCell = `${BATTLE_SETTINGS.cellName}_${xValue}_${yValue}`;

				const battleFieldCell = this.battleField.getSlot(fieldCell);
				if (battleFieldCell) {
					battleFieldCell.value = this.frameDomain.getDomainValueFrameByFrame(gameObject);
				}
			}
		});
	}

	private getXY(slotName: string): { x: number; y: number } {
		const splittedSlotName = slotName.split("_");
		return { x: Number(splittedSlotName[1]), y: Number(splittedSlotName[2]) };
	}

	private isPanelObject(frame: Frame): boolean {
		const pictureSlot = frame.getSlot(BATTLE_SETTINGS.pictureSlotName);
		const pictureSlotValue = pictureSlot?.value;
		if (pictureSlotValue) {
			return !isEmpty((pictureSlotValue as DomainValueString).value);
		}

		return false;
	}
}

declare module "@ember/service" {
	interface Registry {
		"battle-core": BattleCore;
	}
}
