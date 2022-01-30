import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";
import { htmlSafe } from "@ember/template";
import { Rule, Variable } from "knowledge-shell/models";
import { create, test, enforce, only, skipWhen } from "vest";
import ProductionInterpretter from "knowledge-shell/interpretter/production";
import Form from "../form";

const ruleFormValidator = create((data: RuleForm, changedField: string) => {
	only(changedField);

	test("name", "form.validation_errors.required_field", () => {
		enforce(data.name).isNotEmpty();
	});

	test("reason", "form.validation_errors.required_field", () => {
		enforce(data.reason).isNotEmpty();
	});

	test("premise", "form.validation_errors.required_field", () => {
		enforce(data.premise).isNotEmpty();
	});

	skipWhen(ruleFormValidator.get().hasErrors("premise"), () => {
		test("premise", "models.rule.errors.syntax_symbol_error", () => {
			const isCorrect = data.productionInterpretter.isSyntaxCorrect(data.premise);
			enforce(isCorrect.pass).isTruthy();
		});

		test("premise", "models.rule.errors.syntax_language_error", () => {
			const isCorrect = data.productionInterpretter.isLanguageCorrect(data.rule, data.premise);
			enforce(isCorrect.pass).isTruthy();
		});
	});

	test("consequence", "form.validation_errors.required_field", () => {
		enforce(data.consequence).isNotEmpty();
	});

	skipWhen(ruleFormValidator.get().hasErrors("consequence"), () => {
		test("consequence", "models.rule.errors.syntax_symbol_error", () => {
			const isCorrect = data.productionInterpretter.isSyntaxCorrect(data.consequence);
			enforce(isCorrect.pass).isTruthy();
		});

		test("consequence", "models.rule.errors.syntax_language_error", () => {
			const isCorrect = data.productionInterpretter.isLanguageCorrect(data.rule, data.consequence);
			enforce(isCorrect.pass).isTruthy();
		});
	});
});

interface RuleFormArgs {
	rule: Rule;
	variables: Variable[];
	onSubmit: (name: string, reason: string, premise: string, consequence: string) => void;
	onCancel: () => void;
}

export default class RuleForm extends Form<RuleFormArgs> {
	productionInterpretter = new ProductionInterpretter();

	@tracked rule!: Rule;
	@tracked name!: string;
	@tracked reason!: string;
	@tracked premise!: string;
	@tracked consequence!: string;

	@tracked validator = ruleFormValidator.get();

	get fullRule(): any {
		return htmlSafe(
			`IF:\r\n&nbsp;&nbsp;${this.premise}\r\n` +
				`THEN:\r\n&nbsp;&nbsp;${this.consequence}\r\n` +
				`WHY:\r\n&nbsp;&nbsp;${this.reason}`,
		);
	}

	get nameValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const nameValidation = this.getFieldValidation("name");
		return nameValidation;
	}

	get reasonValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const reasonValidation = this.getFieldValidation("reason");
		return reasonValidation;
	}

	get premiseValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("premise").map((errorKey: string) => this.intl.t(errorKey));
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	get consequenceValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("consequence").map((errorKey: string) => this.intl.t(errorKey));
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	@action
	setupForm(): void {
		const { rule } = this.args;
		this.rule = rule;
		this.name = rule.name;
		this.reason = rule.reason;
		this.premise = rule.premise;
		this.consequence = rule.consequence;
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm(ruleFormValidator);
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { name, reason, premise, consequence } = this;
			this.args.onSubmit(name, reason, premise, consequence);
		}
	}

	@action
	onFieldChange(fieldName: string, value: string): void {
		// @ts-ignore
		set(this, fieldName, value);
		this.validateForm(ruleFormValidator, fieldName);
	}
}
