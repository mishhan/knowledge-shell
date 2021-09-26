import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { htmlSafe } from "@ember/template";
import { Variable } from "knowledge-shell/models";
import ruleValidator from "knowledge-shell/validations/rule";

interface RuleFormArgs {
	name: string;
	reason: string;
	premise: string;
	consequence: string;

	variables: Variable[];
	onSubmit: (name: string, reason: string, premise: string, consequence: string) => void;
	onCancel: () => void;
}

export default class RuleForm extends Component<RuleFormArgs> {
	@tracked isSubmitted!: boolean;

	@tracked name!: string;
	@tracked reason!: string;
	@tracked premise!: string;
	@tracked consequence!: string;

	@tracked validator = ruleValidator.get();

	get fullRule(): any {
		return htmlSafe(
			`IF:\r\n&nbsp;&nbsp;${this.premise}\r\n` +
				`THEN:\r\n&nbsp;&nbsp;${this.consequence}\r\n` +
				`WHY:\r\n&nbsp;&nbsp;${this.reason}`,
		);
	}

	get nameValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("name");
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	get reasonValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("reason");
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	get premiseValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("premise");
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	get consequenceValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("consequence");
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
		this.name = this.args.name;
		this.reason = this.args.reason;
		this.premise = this.args.premise;
		this.consequence = this.args.consequence;
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm();
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { name, reason, premise, consequence } = this;
			this.args.onSubmit(name, reason, premise, consequence);
		}
	}

	@action
	onNameChange(value: string): void {
		this.name = value;
		this.validateForm("name");
	}

	@action
	onReasonChange(value: string): void {
		this.reason = value;
		this.validateForm("reason");
	}

	@action
	onPremiseChange(value: string): void {
		this.premise = value;
		this.validateForm("premise");
	}

	@action
	onConsequenceChange(value: string): void {
		this.consequence = value;
		this.validateForm("consequence");
	}

	validateForm(fieldName?: string): void {
		const { name, reason, premise, consequence } = this;
		this.validator = ruleValidator(
			{
				name,
				reason,
				premise,
				consequence,
			},
			fieldName,
		);
	}
}
