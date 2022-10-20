import Service, { inject as service } from "@ember/service";
import IntlService from "ember-intl/services/intl";
import { Frame, VariableType } from "knowledge-shell/models";
import GameObjectInfo from "./frame/game-object-info";
import { VariableInference } from "./production";

export type TreeEntry = {
	name: string;
	children: TreeEntry[];
};

export default class TreeInfoConverter extends Service {
	@service intl!: IntlService;

	public convertFrameInference(gameObjectsInfo: GameObjectInfo[]): TreeEntry[] {
		const gameObjectsTreeEntry: TreeEntry[] = [];
		for (const gameObjectInfo of gameObjectsInfo) {
			const gameObjectTreeEntry = this.convertFrameInferenceToTreeEntry(gameObjectInfo);
			gameObjectsTreeEntry.push(gameObjectTreeEntry);
		}

		return gameObjectsTreeEntry;
	}

	/**
	 * @summary
	 * Variable: value
	 * |	Reason: reason
	 * |	Rule
	 * 		|		Variable: value
	 * @param {VariableInference} variableInference
	 * @returns {TreeEntry} variable inference tree
	 */
	public convertVariableInference(variableInference: VariableInference): TreeEntry {
		const treeEntry = this.convertVariableInferenceToTreeEntry(variableInference);
		return treeEntry;
	}

	private convertFrameInferenceToTreeEntry(gameObjectInfo: GameObjectInfo): TreeEntry {
		const gameObjectTreeEntry: TreeEntry = { name: gameObjectInfo.object.name, children: [] };
		const attachedSituationsString = this.intl.t("pages.frame_editor.testing.battle.attached_situations", {
			count: gameObjectInfo.objectAttachedSituations.length,
		});
		const situationNames = gameObjectInfo.objectAttachedSituations.map((situationFrame: Frame) => situationFrame.name);
		const situationsChild: TreeEntry = {
			name: attachedSituationsString,
			children: situationNames.map((situationName: string) => {
				return { name: situationName, children: [] };
			}),
		};
		gameObjectTreeEntry.children.push(situationsChild);

		const chosenSituationString = this.intl.t("pages.frame_editor.testing.battle.chosen_situation", {
			situation: gameObjectInfo.objectSituation.name,
		});
		const chosenSituationChild: TreeEntry = { name: chosenSituationString, children: [] };
		gameObjectTreeEntry.children.push(chosenSituationChild);

		return gameObjectTreeEntry;
	}

	private convertVariableInferenceToTreeEntry(variableInference: VariableInference): TreeEntry {
		// @ts-ignore
		const treeEntryName = `${variableInference.currentVariable.name} : ${variableInference.currentVariable.value?.valueStr}`;
		const hasChildren = variableInference.currentVariable.variableType !== VariableType.Requested;
		const treeEntry: TreeEntry = { name: treeEntryName, children: [] };
		if (hasChildren) {
			const reasonString = this.intl.t("models.rule.fields.reason");
			const reasonChildNode: TreeEntry = {
				name: `${reasonString}: ${variableInference.currentRule?.reason}`,
				children: [],
			};
			treeEntry.children.push(reasonChildNode);

			const ruleChildNode: TreeEntry = {
				name: `${variableInference.currentRule?.name}: ${variableInference.currentRule?.fullRule}`,
				children: [],
			};
			treeEntry.children.push(ruleChildNode);

			for (const inference of variableInference.currentInference) {
				const inferenceTreeEntry = this.convertVariableInferenceToTreeEntry(inference);
				ruleChildNode.children.push(inferenceTreeEntry);
			}
		}

		return treeEntry;
	}
}

declare module "@ember/service" {
	interface Registry {
		"tree-info-converter": TreeInfoConverter;
	}
}
