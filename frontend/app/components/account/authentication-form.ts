import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";
import { create, test, enforce, only } from "vest";
import Form from "../form";

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

export default class AccountAuthenticationForm extends Form<AccountAuthenticationFormArgs> {
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

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm(authFormValidator);
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { identification, password } = this;
			this.args.authenticate(identification, password);
		}
	}

	@action
	onFieldChange(fieldName: string, value: string): void {
		// @ts-ignore
		set(this, fieldName, value);
		this.validateForm(authFormValidator, fieldName);
	}
}
