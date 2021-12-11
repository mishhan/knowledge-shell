import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import type IntlService from "ember-intl/services/intl";
import { action } from "@ember/object";
import { KnowledgeBaseType } from "knowledge-shell/models";
import { create, test, enforce, only } from "vest";

const kbFormValidator = create((data: KbFormComponent, cnahgedField: string) => {
	only(cnahgedField);

	test("name", "form.validation_errors.required_field", () => {
		enforce(data.name).isNotEmpty();
	});

	test("description", "form.validation_errors.required_field", () => {
		enforce(data.description).isNotEmpty();
	});
});

interface KbFormComponentArgs {
	name: string;
	description: string;
	type: KnowledgeBaseType;
	canEditType: boolean;
	onSubmit: (name: string, description: string, type: KnowledgeBaseType) => void;
	onCancel: () => void;
}

export default class KbFormComponent extends Component<KbFormComponentArgs> {
	@service intl!: IntlService;

	@tracked isSubmitted!: boolean;

	@tracked name!: string;
	@tracked description!: string;
	@tracked type!: KnowledgeBaseType;

	@tracked validator = kbFormValidator.get();

	get kbTypes(): { key: number; value: string }[] {
		return [
			{ key: KnowledgeBaseType.Frame, value: KnowledgeBaseType[KnowledgeBaseType.Frame] },
			{ key: KnowledgeBaseType.Production, value: KnowledgeBaseType[KnowledgeBaseType.Production] },
		];
	}

	get selectedType(): { key: number; value: string } {
		return { key: this.type, value: KnowledgeBaseType[this.type] };
	}

	get nameValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const nameValidation = this.getFieldValidation("name");
		return nameValidation;
	}

	get descriptionValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const descriptionValidation = this.getFieldValidation("description");
		return descriptionValidation;
	}

	getFieldValidation(fieldName: string): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors(fieldName).map((errorKey: string) => this.intl.t(errorKey));
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
		this.description = this.args.description;
		this.type = this.args.type;
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm();
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { name, description, type } = this;
			this.args.onSubmit(name, description, type);
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
	setType(type: { key: KnowledgeBaseType; value: string }): void {
		this.type = type.key;
	}

	validateForm(fieldName?: string): void {
		this.validator = kbFormValidator(this, fieldName);
	}
}
