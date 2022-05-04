/* eslint-disable ember/require-tagless-components */
import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";
import { create, test, enforce, only } from "vest";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import isEmail from "validator/es/lib/isEmail";
import Form from "../form";

enforce.extend({ isEmail });
enforce.extend({ isStrongPassword });

const registrationFormValidator = create((data: AccountRegistrationForm, cnahgedField: string) => {
	only(cnahgedField);

	test("userName", "form.validation_errors.required_field", () => {
		enforce(data.userName).isNotEmpty();
	});

	test("userName", "form.validation_errors.gte_3", () => {
		enforce(data.userName).longerThanOrEquals(3);
	});

	test("email", "form.validation_errors.required_field", () => {
		enforce(data.email).isNotEmpty();
	});

	test("email", "form.validation_errors.incorrect_email", () => {
		enforce(data.email).isEmail();
	});

	test("password", "form.validation_errors.required_field", () => {
		enforce(data.password).isNotEmpty();
	});

	test("password", "form.validation_errors.strong_password", () => {
		enforce(data.password).isStrongPassword();
	});

	test("acceptTerms", "form.validation_errors.tof", () => {
		enforce(data.acceptTerms).isTruthy();
	});
});

interface AccountRegistrationFormArgs {
	registr: (userName: string, email: string, password: string) => void;
	isLoading: boolean;
}

export default class AccountRegistrationForm extends Form<AccountRegistrationFormArgs> {
	@tracked userName!: string;
	@tracked email!: string;
	@tracked password!: string;
	@tracked showPassword = false;
	@tracked acceptTerms!: boolean;
	@tracked validator = registrationFormValidator.get();

	get userNameValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const userNameValidation = this.getFieldValidation("userName");
		return userNameValidation;
	}

	get emailValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const emailValidation = this.getFieldValidation("email");
		return emailValidation;
	}

	get passwordValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const passwordValidation = this.getFieldValidation("password");
		return passwordValidation;
	}

	get acceptTermsValidation(): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const acceptTermsValidation = this.getFieldValidation("acceptTerms");
		return acceptTermsValidation;
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm(registrationFormValidator);
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { userName, email, password } = this;
			this.args.registr(userName, email, password);
		}
	}

	@action
	onFieldChange(fieldName: string, value: string): void {
		// @ts-ignore
		set(this, fieldName, value);
		this.validateForm(registrationFormValidator, fieldName);
	}
}
