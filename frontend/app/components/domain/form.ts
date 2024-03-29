import { inject as service } from "@ember/service";
import Store from "@ember-data/store";
import { action, set } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Domain, DomainValue, DomainType } from "knowledge-shell/models";
import { create, test, enforce, only } from "vest";
import Form from "../form";

const domainFormValidator = create((data: DomainForm, cnahgedField: string) => {
	only(cnahgedField);

	test("name", "form.validation_errors.required_field", () => {
		enforce(data.name).isNotEmpty();
	});

	test("name", "form.validation_errors.unique_name", () => {
		const domainNames = data.args.domains
			.filter((domain: Domain) => domain.id !== data.args.domain.id)
			.map((domain: Domain) => domain.name)
			.filter((domainName: string) => domainName !== undefined);
		enforce(data.name).notInside(domainNames);
	});

	test("description", "form.validation_errors.required_field", () => {
		enforce(data.description).isNotEmpty();
	});

	test("description", "form.validation_errors.required_field", () => {
		enforce(data.domainType).isNumber();
	});
});

interface DomainFormArgs {
	domain: Domain;
	domains: Domain[];

	onSubmit: (name: string, description: string, domainType: DomainType) => void;
	onCancel: () => void;
}

export default class DomainForm extends Form<DomainFormArgs> {
	@service("store") store!: Store;

	@tracked name!: string;
	@tracked description!: string;
	@tracked domainType!: DomainType;

	@tracked domain!: Domain;

	@tracked newValue!: string | number;

	@tracked validator = domainFormValidator.get();

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
		const nameValidation = this.getFieldValidation("name");
		return nameValidation;
	}

	get descriptionValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const nameValidation = this.getFieldValidation("description");
		return nameValidation;
	}

	get domainTypeValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const domainTypeValidation = this.getFieldValidation("domainType");
		return domainTypeValidation;
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
		const { name, description, domainType } = this.args.domain;
		this.name = name;
		this.description = description;
		this.domainType = domainType;
		this.domain = this.args.domain;
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm(domainFormValidator);
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { name, description, domainType } = this;
			this.args.onSubmit(name, description, domainType);
		}
	}

	@action
	onFieldChange(fieldName: string, value: string): void {
		// @ts-ignore
		set(this, fieldName, value);
		this.validateForm(domainFormValidator, fieldName);
	}

	@action
	setDomainType(domainType: { key: number; value: string }): void {
		this.domainType = domainType.key;
		this.validateForm(domainFormValidator, "domainType");
	}
}
