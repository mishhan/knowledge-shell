import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";
import { KnowledgeBaseType } from "knowledge-shell/models";
import { create, test, enforce, only } from "vest";
import Form from "../form";

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

export default class KbFormComponent extends Form<KbFormComponentArgs> {
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
		this.validateForm(kbFormValidator);
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { name, description, type } = this;
			this.args.onSubmit(name, description, type);
		}
	}

	@action
	onFieldChange(fieldName: string, value: string): void {
		// @ts-ignore
		set(this, fieldName, value);
		this.validateForm(kbFormValidator, fieldName);
	}

	@action
	setType(type: { key: KnowledgeBaseType; value: string }): void {
		this.type = type.key;
	}
}
