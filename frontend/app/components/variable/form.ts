import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";
import { Domain, Variable, VariableType } from "knowledge-shell/models";
import { create, test, enforce, only } from "vest";
import Form from "../form";

const variableFormValidator = create((data: VariableForm, cnahgedField: string) => {
	only(cnahgedField);

	test("name", "form.validation_errors.required_field", () => {
		enforce(data.name).isNotEmpty();
	});

	test("name", "form.validation_errors.unique_name", () => {
		enforce(data.name).notInside(data.variableNameCollection);
	});

	test("description", "form.validation_errors.required_field", () => {
		enforce(data.description).isNotEmpty();
	});

	if (data.variableType !== VariableType.Derrivable) {
		test("question", "form.validation_errors.required_field", () => {
			enforce(data.question).isNotEmpty();
		});
	}

	test("variableType", "form.validation_errors.required_field", () => {
		enforce(data.variableType).isNumber();
	});

	test("domain", "form.validation_errors.required_field", () => {
		enforce(data.domain).isNotNull();
	});
});

interface VariableFormArgs {
	variable: Variable;
	variables: Variable[];
	domains: Domain[];

	onSubmit: (name: string, domain: Domain, variableType: VariableType, description: string, question: string) => void;
	onCancel: () => void;
}

export default class VariableForm extends Form<VariableFormArgs> {
	@tracked name!: string;
	@tracked domain!: Domain;
	@tracked variableType!: VariableType;
	@tracked description!: string;
	@tracked question!: string;

	@tracked validator = variableFormValidator.get();
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
		const nameValidation = this.getFieldValidation("name");
		return nameValidation;
	}

	get domainValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const domainValidation = this.getFieldValidation("domain");
		return domainValidation;
	}

	get variableTypeValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const variableTypeValidation = this.getFieldValidation("variableType");
		return variableTypeValidation;
	}

	get descriptionValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const descriptionValidation = this.getFieldValidation("description");
		return descriptionValidation;
	}

	get questionValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const questionValidation = this.getFieldValidation("question");
		return questionValidation;
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
		this.validateForm(variableFormValidator);
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { name, description, question, variableType, domain } = this;
			this.args.onSubmit(name, domain, variableType, description, question);
		}
	}

	@action
	onFieldChange(fieldName: string, value: string): void {
		// @ts-ignore
		set(this, fieldName, value);
		this.validateForm(variableFormValidator, fieldName);
	}

	@action
	setVariableType(variableType: { key: VariableType; value: string }): void {
		this.variableType = variableType.key;
		this.validateForm("variableType");
	}
}
