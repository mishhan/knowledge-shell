import EmberObject, { computed } from "@ember/object";
import { isEmpty } from "@ember/utils";
import { Domain, DomainValue, DomainValueFrame, DomainValueString, Frame, FrameBase, Slot } from "knowledge-shell/models";
import getRandomInt from "knowledge-shell/utils/get-random-int";
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

export default class BattleCore extends EmberObject {
  frameBase!: FrameBase;
  @computed.oneWay("frameBase.frames") frames!: Frame[];
  @computed.oneWay("frameBase.domains") domains!: Domain[];
  @computed.oneWay("frameBase.frameDomain") frameDomain!: Domain;

  battleLogicCore!: BattleLogicCore;
  panelObjects: Frame[] = [];
  gameObjects: Frame[] = [];

  x!: number;
  y!: number;
  battleField!: Frame;
  freeCell!: Frame;

  public initialize(): void {
    this.battleLogicCore = BattleLogicCore.create({ frameBase: this.frameBase });
    this.x = this.frameBase.getDomain(BATTLE_SETTINGS.xDomainName).length;
    this.y = this.frameBase.getDomain(BATTLE_SETTINGS.yDomainName).length
    this.battleField = this.frameBase.getFrame(BATTLE_SETTINGS.fieldFrameName);
    this.freeCell = this.frameBase.getFrame(BATTLE_SETTINGS.freeCellFrameName);

    this.initializePanel();
    this.initializeField();
  }

  public addObjectOnField(panelObject: Frame, cellName: string):void {
    const battleCell = this.battleField.getSlot(cellName);
    if (!isEmpty(battleCell)) {
      const { x, y } = this.getXY(cellName);
      const frameSample = this.frameBase.addFrameSample(panelObject);
      frameSample.getSlot(BATTLE_SETTINGS.xDomainName).value = 
        this.frameBase.getDomain(BATTLE_SETTINGS.xDomainName).getDomainValueStringByName(x);
      frameSample.getSlot(BATTLE_SETTINGS.yDomainName).value = 
        this.frameBase.getDomain(BATTLE_SETTINGS.yDomainName).getDomainValueStringByName(y);

      const nullSlots = frameSample.ownSlots.filter((sl) => isEmpty(sl.value));
      for (const nullSlot of nullSlots) {
        const number = getRandomInt(0, nullSlot.domain.length - 1);
        nullSlot.value = nullSlot.domain.domainValuesOrdered.objectAt(number) as DomainValue;
      }

      this.gameObjects.pushObject(frameSample);
      battleCell.value = this.frameDomain.getDomainValueFrameByFrame(frameSample);
    }
  }

  public moveObjectOnField(gameObjectCell: Slot, newCellName: string): void {
    const battleCell = this.battleField.getSlot(newCellName);
    if (!isEmpty(battleCell)) {
      const itemToSwap = (battleCell.value as DomainValueFrame).value;
      const frameSample = (gameObjectCell.value as DomainValueFrame).value;
      itemToSwap.getSlot(BATTLE_SETTINGS.xDomainName).value = frameSample.getSlot(BATTLE_SETTINGS.xDomainName).value;
      itemToSwap.getSlot(BATTLE_SETTINGS.yDomainName).value = frameSample.getSlot(BATTLE_SETTINGS.yDomainName).value;
      const { x, y } = this.getXY(newCellName);

      frameSample.getSlot(BATTLE_SETTINGS.xDomainName).value = 
        this.frameBase.getDomain(BATTLE_SETTINGS.xDomainName).getDomainValueStringByName(x);
      frameSample.getSlot(BATTLE_SETTINGS.yDomainName).value = 
        this.frameBase.getDomain(BATTLE_SETTINGS.yDomainName).getDomainValueStringByName(y);
      
      gameObjectCell.value = 
        this.frameDomain.getDomainValueFrameByFrame((battleCell.value as DomainValueFrame).value);
      battleCell.value = this.frameDomain.getDomainValueFrameByFrame(frameSample);
    }
  }

  public playStep(): boolean {
    let hasAttachedSituations = false;
    const baseSituation = this.frameBase.getFrame(BATTLE_SETTINGS.baseSituation);
    for (const gameObject of this.gameObjects) {
      const situationToAttach = this.frameBase.addFrameSample();
      const agentSlot = this.frameBase.addEmptySlot();
      agentSlot.setProperties({
        name: BATTLE_SETTINGS.agentSlotName,
        owner: situationToAttach,
        domain: this.frameDomain,
        value: this.frameDomain.getDomainValueFrameByFrame(gameObject)
      });

      const attachedSituations = this.battleLogicCore.attachToFrameOrChildren(
        baseSituation,
        situationToAttach
      );

      if (attachedSituations.length > 0) {
        //need to choose random situation..
        const chosenSituation = attachedSituations[0];

        /**
         * what's going on here? :D
         * we've got the situation
         * we've got the result of this situation ('go left' for example)
         * we're creating new agent frame
         * we're creating new slot - agent and set his owner = agent frame (^^)
         * we're attaching this new agent frame (with agent slot) to our attached situation result
         * ^^ - production evaluation (slot values change)
        */
        const result = 
          (chosenSituation.getSlot(BATTLE_SETTINGS.resultSlotName).value as DomainValueFrame).value;
        const sampleAttachedAgent = this.frameBase.addFrameSample();
        const sampleAttachedAgentSlot = this.frameBase.addEmptySlot();

        sampleAttachedAgentSlot.setProperties({
          name: BATTLE_SETTINGS.agentSlotName,
          owner: sampleAttachedAgent,
          domain: this.frameDomain,
          value: this.frameDomain.getDomainValueFrameByFrame(gameObject)
        });

        this.battleLogicCore.attachToFrame(result, sampleAttachedAgent);

        hasAttachedSituations = true;
      }
    }

    this.refreshField();

    return hasAttachedSituations;
  }


  private initializePanel(): void {
    this.panelObjects = this.frames.filter((frame: Frame) => this.isPanelObject(frame));
  }

  private initializeField(): void {
    for (const slot of this.battleField.sortedSlots) {
      const freeCellSample = this.frameBase.addFrameSample(this.freeCell);
      const { x, y } = this.getXY(slot.name);
      freeCellSample.getSlot(BATTLE_SETTINGS.xDomainName).value = this.frameDomain.getDomainValueStringByName(x);
      freeCellSample.getSlot(BATTLE_SETTINGS.yDomainName).value = this.frameDomain.getDomainValueStringByName(y);
      
      slot.value = this.frameDomain.getDomainValueFrameByFrame(freeCellSample);
    } 
  }

  private refreshField(): void {
    this.initializeField();

    for (const gameObject of this.gameObjects) {
      const x = (gameObject.getSlot(BATTLE_SETTINGS.xDomainName).value as DomainValueString).valueStr;
      const y = (gameObject.getSlot(BATTLE_SETTINGS.yDomainName).value as DomainValueString).valueStr;
      const fieldCell = `${BATTLE_SETTINGS.cellName}_${x}_${y}`;
      this.battleField.getSlot(fieldCell).value = this.frameDomain.getDomainValueFrameByFrame(gameObject);
    }
  }

  private getXY(slotName: string): { x: string, y: string } {
    const splittedSlotName = slotName.split("_");
    return { x: splittedSlotName[1], y: splittedSlotName[2] };
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