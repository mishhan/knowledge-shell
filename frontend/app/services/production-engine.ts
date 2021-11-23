/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import Service from "@ember/service";
import ProductionInterpretter from "knowledge-shell/interpretter/production/production-interpretter";
import { ProductionBase, Rule, Variable, VariableType } from "knowledge-shell/models";
import Stack from "knowledge-shell/utils/stack";

export type RulePremiseConsequenceVariables = {
	premiseVariables: Variable[];
	consequenceVariables: Variable[];
};

export type ConsultationStatus = "Success" | "Continue" | "Failed";
export type ConsultationState =
	| {
			Status: "Success";
	  }
	| {
			Status: "Continue";
			Variable: Variable;
	  }
	| {
			Status: "Failed";
	  };

export default class ProductionEngine extends Service {
	private readonly productionInterpretter = new ProductionInterpretter();

	private productionBase!: ProductionBase;
	private rules!: Rule[];
	private variableStack!: Stack<Variable>;
	private usedRuleStack!: Stack<Rule>;

	private rulePremiseVariablesMap = new Map<Rule, Variable[]>();
	private ruleConsequenceVariablesMap = new Map<Rule, Variable[]>();
	private rulePremiseConsequenceVariableMap = new Map<Rule, RulePremiseConsequenceVariables>();
	private variableInference = new Map<Variable, Array<Array<Variable>>>();

	public initialize(productionBase: ProductionBase, goal: Variable): void {
		this.rulePremiseVariablesMap.clear();
		this.ruleConsequenceVariablesMap.clear();
		this.rulePremiseConsequenceVariableMap.clear();
		this.variableInference.clear();

		productionBase.variables.forEach((variable: Variable) => {
			variable.value = null;
		});
		this.productionBase = productionBase;
		this.usedRuleStack = new Stack<Rule>();
		this.variableStack = new Stack<Variable>();
		this.variableStack.push(goal);
		this.rules = productionBase.rules.sortBy("order");
		this.rules.forEach((rule: Rule) => {
			const premiseVariables = this.extractVariables(rule.premise);
			const consequenceVariables = this.extractVariables(rule.consequence);
			this.rulePremiseVariablesMap.set(rule, premiseVariables);
			this.ruleConsequenceVariablesMap.set(rule, consequenceVariables);
			this.rulePremiseConsequenceVariableMap.set(rule, {
				premiseVariables,
				consequenceVariables,
			});

			consequenceVariables.forEach((variable: Variable) => {
				const hasVariableInference = this.variableInference.has(variable);
				if (!hasVariableInference) {
					this.variableInference.set(variable, []);
				}
				this.variableInference.get(variable)?.push(premiseVariables);
			});
		});
	}

	/**
	 * Extract variables from given rule part
	 * @param {string} rulePart - premise or consequence
	 * @returns {Variable[]} array of variables used in rule part
	 */
	public extractVariables(rulePart: string): Variable[] {
		const identifiers = this.productionInterpretter.extractIdentifiers(rulePart);
		const variables = this.productionBase.variables.filter(
			(variable: Variable) => identifiers.indexOf(variable.name.toLowerCase()) !== -1,
		);
		const uniqueVariables = [...new Set(variables)];
		return uniqueVariables;
	}

	public getUsedRules(): Rule[] {
		return this.usedRuleStack.toArray();
	}

	/**
	 * Get current consultation state
	 * @returns {ConsultationState} consultation state
	 */
	public getCurrentState(): ConsultationState {
		const { variableStack } = this;
		const shouldContinue = true;
		while (shouldContinue) {
			if (variableStack.isEmpty) {
				return {
					Status: "Success",
				};
			}

			const currentGoal = variableStack.peek();

			if (currentGoal.variableType === VariableType.Requested) {
				variableStack.pop();
				return {
					Status: "Continue",
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
					return {
						Status: "Continue",
						Variable: currentGoal,
					};
				}
			}

			return {
				Status: "Failed",
			};
		}

		return {
			Status: "Failed",
		};
	}

	/**
	 * Assigns variable value evaluationg rule
	 * @param {Rule} rule
	 * @returns {Boolean} assigning result
	 */
	private assignVariableFromRule(rule: Rule): boolean {
		const isPremiseTrue = this.productionInterpretter.evaluate(rule, rule.premise) as boolean;
		if (isPremiseTrue) {
			this.productionInterpretter.evaluate(rule, rule.consequence);
			this.usedRuleStack.push(rule);
			return true;
		}

		return false;
	}

	/**
	 * Determinse if variable in rule consequence
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
