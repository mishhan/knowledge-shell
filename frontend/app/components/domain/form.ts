import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import Store from "@ember-data/store";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Domain, DomainValue, DomainType } from "knowledge-shell/models";
import domainValidator from "knowledge-shell/validations/domain";

interface DomainFormArgs {
	name: string;
	description: string;
	domainType: DomainType;

	domain: Domain;

	onSubmit: (name: string, description: string, domainType: DomainType) => void;
	onCancel: () => void;
}

export default class DomainForm extends Component<DomainFormArgs> {
	@service("store") store!: Store;

	@tracked isSubmitted!: boolean;

	@tracked name!: string;
	@tracked description!: string;
	@tracked domainType!: DomainType;

	@tracked domain!: Domain;

	@tracked newValue!: string | number;

	@tracked validator = domainValidator.get();

	get domainTypes(): { key: number; value: string }[] {
		return [
			{ key: DomainType.String, value: DomainType[DomainType.String] },
			{ key: DomainType.Number, value: DomainType[DomainType.Number] },
		];
	}

	get selectedDomainType(): { key: number; value: string } {
		return { key: this.domainType, value: DomainType[this.domainType] };
	}

	get domainTypeControl(): string {
		switch (this.domainType) {
			case DomainType.Number:
				return "number";
			case DomainType.String:
				return "text";
			default:
				return "text";
		}
	}

	get domainHasValues(): boolean {
		return this.domain?.domainValues.length > 0;
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

	get domainTypeValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors("domainType");
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	@action
	addValue(): void {
		let newDomainValue: DomainValue;
		switch (this.domainType) {
			case DomainType.Number:
				newDomainValue = this.store.createRecord("domain-value-number", {
					value: this.newValue,
					order: this.domain.domainValues.length,
				});
				break;
			case DomainType.String:
				newDomainValue = this.store.createRecord("domain-value-string", {
					value: this.newValue,
					order: this.domain.domainValues.length,
				});
				break;
			default:
				newDomainValue = this.store.createRecord("domain-value-string", {
					value: this.newValue,
					order: this.domain.domainValues.length,
				});
				break;
		}

		this.domain.domainValues.pushObject(newDomainValue);
	}

	@action
	deleteDomainValue(domainValue: DomainValue): void {
		this.domain.domainValues.removeObject(domainValue);
	}

	@action
	reorderDomainValues(reorderedValues: DomainValue[]) {
		reorderedValues.forEach((dv: DomainValue, index: number) => {
			dv.order = index;
		});
	}

	@action
	setupForm(): void {
		this.name = this.args.name;
		this.description = this.args.description;
		this.domainType = this.args.domainType;
		this.domain = this.args.domain;
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm();
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { name, description, domainType } = this;
			this.args.onSubmit(name, description, domainType);
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
	setDomainType(domainType: { key: number; value: string }): void {
		this.domainType = domainType.key;
	}

	validateForm(fieldName?: string): void {
		const { name, description, domainType } = this;
		this.validator = domainValidator(
			{
				name,
				description,
				domainType,
			},
			fieldName,
		);
	}
}
