import Service from "@ember/service";
import ProductionInterpretter from "knowledge-shell/interpretter/production/production-interpretter";
import { ProductionBase, Rule, Variable, VariableType } from "knowledge-shell/models";
import Stack from "knowledge-shell/utils/stack";

type RulePremiseConsequenceVariables = {
	premiseVariables: Variable[];
	consequenceVariables: Variable[];
};

export enum ConsultationStatus {
	Success,
	InProgress,
	Failed,
}

export type ConsultationState =
	| {
			Status: ConsultationStatus.Success;
	  }
	| {
			Status: ConsultationStatus.InProgress;
			Variable: Variable;
	  }
	| {
			Status: ConsultationStatus.Failed;
	  };

export default class ProductionEngine extends Service {
	private readonly productionInterpretter = new ProductionInterpretter();

	private productionBase!: ProductionBase;
	private rules!: Rule[];
	private goalVariable!: Variable;
	public variableInferenceStack!: Stack<Variable>;

	private rulePremiseConsequenceVariableMap = new Map<Rule, RulePremiseConsequenceVariables>();

	public initialize(productionBase: ProductionBase): void {
		this.rulePremiseConsequenceVariableMap.clear();

		this.productionBase = productionBase;
		this.variableInferenceStack = new Stack<Variable>();

		this.productionBase.variables.forEach((variable: Variable) => {
			variable.value = null;
		});

		this.rules = productionBase.rules.sortBy("order");
		this.rules.forEach((rule: Rule) => {
			const premiseVariables = this.extractVariables(rule.premise);
			const consequenceVariables = this.extractVariables(rule.consequence);
			this.rulePremiseConsequenceVariableMap.set(rule, {
				premiseVariables,
				consequenceVariables,
			});
		});
	}

	/**
	 * Sets goal variable and clear all variable values
	 * @param {Variable} goal - goal variable
	 */
	public setGoal(goal: Variable): void {
		this.goalVariable = goal;
		this.variableInferenceStack.clear();
		this.productionBase.variables.forEach((variable: Variable) => {
			variable.value = null;
		});
	}

	/**
	 * Get current consultation state
	 * All logic to determine next unknown variable is here
	 * @returns {ConsultationState} consultation state
	 */
	public getCurrentState(): ConsultationState {
		const variableStack = new Stack<Variable>();
		variableStack.push(this.goalVariable);
		const shouldContinue = true;
		while (shouldContinue) {
			if (variableStack.isEmpty) {
				return {
					Status: ConsultationStatus.Success,
				};
			}

			const currentGoal = variableStack.peek();
			if (currentGoal.variableType === VariableType.Requested) {
				variableStack.pop();

				if (currentGoal.hasValue) {
					return {
						Status: ConsultationStatus.Success,
					};
				}

				this.variableInferenceStack.push(currentGoal);
				return {
					Status: ConsultationStatus.InProgress,
					Variable: currentGoal,
				};
			}

			let isCurrentGoalKnown = false;
			for (const rule of this.rules) {
				const isVariableInConsequence = this.isVariableInConsequence(currentGoal, rule);
				const isRulePremiseKnown = this.isRulePremiseKnown(rule);
				const shouldTryToAssign = isVariableInConsequence && isRulePremiseKnown;
				if (!shouldTryToAssign) {
					continue;
				}

				const isAssigned = this.assignVariableFromRule(rule);
				if (isAssigned) {
					isCurrentGoalKnown = true;
					break;
				}
			}

			if (isCurrentGoalKnown) {
				variableStack.pop();
				continue;
			}

			let currentGoalCanBeFound = false;
			for (const [rule, rulePremiseConsequence] of this.rulePremiseConsequenceVariableMap) {
				const isInConsequence = this.isVariableInConsequence(currentGoal, rule);
				if (!isInConsequence) {
					continue;
				}

				let premiseHasUnknown = false;
				for (const premiseVariable of rulePremiseConsequence.premiseVariables) {
					if (!premiseVariable.hasValue) {
						currentGoalCanBeFound = true;
						premiseHasUnknown = true;
						variableStack.push(premiseVariable);
						break;
					}
				}

				if (premiseHasUnknown) {
					break;
				}
			}

			if (currentGoalCanBeFound) {
				continue;
			}

			if (!currentGoalCanBeFound) {
				if (currentGoal.variableType === VariableType.DerrivableRequested) {
					variableStack.pop();
					this.variableInferenceStack.push(currentGoal);
					return {
						Status: ConsultationStatus.InProgress,
						Variable: currentGoal,
					};
				}
			}

			return {
				Status: ConsultationStatus.Failed,
			};
		}

		return {
			Status: ConsultationStatus.Failed,
		};
	}

	/**
	 * Extract variables from given rule part
	 * @param {string} rulePart - premise or consequence
	 * @returns {Variable[]} array of variables used in rule part
	 */
	private extractVariables(rulePart: string): Variable[] {
		const identifiers = this.productionInterpretter.extractIdentifiers(rulePart);
		const lowerCaseIdentifiers = identifiers.map((identifier: string) => identifier.toLowerCase());

		const ruleVariables: Variable[] = [];
		for (let i = 0; i < lowerCaseIdentifiers.length; i += 1) {
			const variable = this.productionBase.variables.find(
				(v: Variable) => lowerCaseIdentifiers[i] === v.name.toLowerCase(),
			);
			if (variable) ruleVariables.pushObject(variable);
		}
		const uniqueVariables = [...new Set(ruleVariables)];
		return uniqueVariables;
	}

	/**
	 * Assigns variable value evaluating the rule
	 * @param {Rule} rule
	 * @returns {Boolean} assigning result
	 */
	private assignVariableFromRule(rule: Rule): boolean {
		const isPremiseTrue = this.productionInterpretter.evaluate(rule, rule.premise) as boolean;
		if (isPremiseTrue) {
			this.productionInterpretter.evaluate(rule, rule.consequence);
			return true;
		}

		return false;
	}

	/**
	 * Determinse whether variable in rule consequence
	 * @param {Variable} variable
	 * @param {Rule} rule
	 * @returns {boolean} true if variable in rule consequence false otherwise
	 */
	private isVariableInConsequence(variable: Variable, rule: Rule): boolean {
		const ruleVariables = this.rulePremiseConsequenceVariableMap.get(rule);
		const isVariableInConsequence = ruleVariables?.consequenceVariables.indexOf(variable) !== -1;
		return isVariableInConsequence;
	}

	/**
	 * Determinse if all premise variables are known
	 * @param {Rule} rule
	 * @returns {boolean} true if there's no unknown variables in rule premise false otherwise
	 */
	private isRulePremiseKnown(rule: Rule): boolean {
		const ruleVariables = this.rulePremiseConsequenceVariableMap.get(rule);
		const isPremiseKnown = ruleVariables?.premiseVariables.every(
			(premiseVariable: Variable) => premiseVariable.hasValue,
		) as boolean;
		return isPremiseKnown;
	}
}

declare module "@ember/service" {
	interface Registry {
		"production-engine": ProductionEngine;
	}
}
