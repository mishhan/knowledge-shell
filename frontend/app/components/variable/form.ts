import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { Domain, Variable, VariableType } from "knowledge-shell/models";
import variableValidator from "knowledge-shell/validations/variable";

interface VariableFormArgs {
	variable: Variable;
	variables: Variable[];
	domains: Domain[];

	onSubmit: (name: string, domain: Domain, variableType: VariableType, description: string, question: string) => void;
	onCancel: () => void;
}

export default class VariableForm extends Component<VariableFormArgs> {
	@tracked isSubmitted!: boolean;

	@tracked name!: string;
	@tracked domain!: Domain;
	@tracked variableType!: VariableType;
	@tracked description!: string;
	@tracked question!: string;

	@tracked validator = variableValidator.get();
	variableNameCollection!: string[];

	get variableTypes(): { key: number; value: string }[] {
		return [
			{ key: VariableType.Requested, value: VariableType[VariableType.Requested] },
			{ key: VariableType.Derrivable, value: VariableType[VariableType.Derrivable] },
			{ key: VariableType.RequestedDerrivable, value: VariableType[VariableType.RequestedDerrivable] },
			{ key: VariableType.DerrivableRequested, value: VariableType[VariableType.DerrivableRequested] },
		];
	}

	get selectedVariableType(): { key: number; value: string } {
		return { key: this.variableType, value: VariableType[this.variableType] };
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

	get domainValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("domain");
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	get variableTypeValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("variableType");
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	get descriptionValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("description");
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	get questionValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("question");
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
		const { name, description, variableType, domain, question } = this.args.variable;
		this.name = name;
		this.description = description;
		this.variableType = variableType;
		this.domain = domain;
		this.question = question;
		this.variableNameCollection = this.args.variables
			.filter((variable: Variable) => variable.id !== this.args.variable.id)
			.map((variable: Variable) => variable.name)
			.filter((variableName: string) => variableName !== undefined);
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm();
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { name, description, question, variableType, domain } = this;
			this.args.onSubmit(name, domain, variableType, description, question);
		}
	}

	@action
	onNameChange(value: string): void {
		this.name = value;
		this.validateForm("name");
	}

	@action
	onDescriptionChange(value: string): void {
		this.description = value;
		this.validateForm("description");
	}

	@action
	onQuestionChange(value: string): void {
		this.question = value;
		this.validateForm("question");
	}

	@action
	setVariableType(variableType: { key: VariableType; value: string }): void {
		this.variableType = variableType.key;
	}

	@action
	setDomain(domain: Domain): void {
		this.domain = domain;
	}

	validateForm(fieldName?: string): void {
		const { name, description, question, variableType, domain } = this;
		this.validator = variableValidator(
			{
				name,
				description,
				question,
				variableType,
				domain,
				nameCollection: this.variableNameCollection,
			},
			fieldName,
		);
	}
}
