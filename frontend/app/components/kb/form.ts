import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { KnowledgeBaseType } from "knowledge-shell/models";
import knowledgeBaseValidator from "knowledge-shell/validations/knowledge-base";

interface KbFormComponentmArgs {
	kbName: string;
	kbDescription: string;
	kbType: KnowledgeBaseType;
	canEditKbType: boolean;
	onSubmit: (kbName: string, kbDescription: string, kbType: KnowledgeBaseType) => void;
	onCancel: () => void;
}

export default class KbFormComponent extends Component<KbFormComponentmArgs> {
	@tracked isSubmitted!: boolean;

	@tracked kbName!: string;
	@tracked kbDescription!: string;
	@tracked kbType!: KnowledgeBaseType;

	@tracked validator = knowledgeBaseValidator.get();

	get kbTypes(): { key: number; value: string }[] {
		return [
			{ key: KnowledgeBaseType.Frame, value: KnowledgeBaseType[KnowledgeBaseType.Frame] },
			{ key: KnowledgeBaseType.Production, value: KnowledgeBaseType[KnowledgeBaseType.Production] },
		];
	}

	get selectedKbType(): { key: number; value: string } {
		return { key: this.kbType, value: KnowledgeBaseType[this.kbType] };
	}

	get kbNameValidationErrors(): string[] {
		const kbNameValidationErrors = this.validator.getErrors("kbName");
		return kbNameValidationErrors;
	}

	get kbDescriptionValidationErrors(): string[] {
		const kbDescriptionValidationErrors = this.validator.getErrors("kbDescription");
		return kbDescriptionValidationErrors;
	}

	@action
	setupForm(): void {
		this.kbName = this.args.kbName;
		this.kbDescription = this.args.kbDescription;
		this.kbType = this.args.kbType;
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm();
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { kbName, kbDescription, kbType } = this;
			this.args.onSubmit(kbName, kbDescription, kbType);
		}
	}

	@action
	onKbNameChange(value: string): void {
		this.kbName = value;
		this.validateForm("kbName");
	}

	@action
	onKbDescriptionChange(value: string): void {
		this.kbDescription = value;
		this.validateForm("kbDescription");
	}

	@action
	setKbType(kbType: { key: KnowledgeBaseType; value: string }): void {
		this.kbType = kbType.key;
	}

	validateForm(fieldName?: string): void {
		const { kbName, kbDescription } = this;
		this.validator = knowledgeBaseValidator(
			{
				kbName,
				kbDescription,
			},
			fieldName,
		);
	}
}
