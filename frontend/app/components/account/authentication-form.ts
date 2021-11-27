import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import type IntlService from "ember-intl/services/intl";
import { action } from "@ember/object";
import { create, test, enforce, only } from "vest";

const authFormValidator = create((data: AccountAuthenticationForm, cnahgedField: string) => {
	only(cnahgedField);

	test("identification", "form.validation_errors.required_field", () => {
		enforce(data.identification).isNotEmpty();
	});

	test("password", "form.validation_errors.required_field", () => {
		enforce(data.password).isNotEmpty();
	});
});

interface AccountAuthenticationFormArgs {
	authenticate: (identification: string, password: string) => void;
	isLoading: boolean;
}

export default class AccountAuthenticationForm extends Component<AccountAuthenticationFormArgs> {
	@service intl!: IntlService;

	@tracked isSubmitted!: boolean;

	@tracked identification!: string;
	@tracked password!: string;
	@tracked showPassword = false;

	@tracked validator = authFormValidator.get();

	get identificationValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const identificationValidation = this.getFieldValidation("identification");
		return identificationValidation;
	}

	get passwordValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const passwordValidation = this.getFieldValidation("password");
		return passwordValidation;
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
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm();
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { identification, password } = this;
			this.args.authenticate(identification, password);
		}
	}

	@action
	onIdentificationChange(value: string): void {
		this.identification = value;
		this.validateForm("identification");
	}

	@action
	onPasswordChange(value: string): void {
		this.password = value;
		this.validateForm("password");
	}

	validateForm(fieldName?: string): void {
		this.validator = authFormValidator(this, fieldName);
	}
}
