import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import userRegistrationValidator from "knowledge-shell/validations/user-registration";

interface AccountRegistrationFormArgs {
	registr: (userName: string, email: string, password: string) => void;
	isLoading: boolean;
}

export default class AccountRegistrationForm extends Component<AccountRegistrationFormArgs> {
	@tracked isSubmitted!: boolean;

	@tracked userName!: string;
	@tracked email!: string;
	@tracked password!: string;
	@tracked showPassword = false;
	@tracked acceptTerms!: boolean;
	@tracked validator = userRegistrationValidator.get();

	get userNameValidationErrors(): string[] {
		const userNameValidationErrors = this.validator.getErrors("userName");
		return userNameValidationErrors;
	}

	get emailValidationErrors(): string[] {
		const emailValidationErrors = this.validator.getErrors("email");
		return emailValidationErrors;
	}

	get passwordValidationErrors(): string[] {
		const passwordValidationErrors = this.validator.getErrors("password");
		return passwordValidationErrors;
	}

	get acceptTermsValidationErrors(): string[] {
		const acceptTermsValidationErrors = this.validator.getErrors("acceptTerms");
		return acceptTermsValidationErrors;
	}

	@action
	onSubmit(event: Event): void {
		event.preventDefault();
		this.isSubmitted = true;
		this.validateForm();
		const hasValidationErrors = this.validator.hasErrors();
		if (!hasValidationErrors) {
			const { userName, email, password } = this;
			this.args.registr(userName, email, password);
		}
	}

	@action
	onUsernameChange(value: string): void {
		this.userName = value;
		this.validateForm("userName");
	}

	@action
	onEmailChange(value: string): void {
		this.email = value;
		this.validateForm("email");
	}

	@action
	onPasswordChange(value: string): void {
		this.password = value;
		this.validateForm("password");
	}

	validateForm(fieldName?: string): void {
		const { userName, email, password, acceptTerms } = this;
		this.validator = userRegistrationValidator(
			{
				userName,
				email,
				password,
				acceptTerms,
			},
			fieldName,
		);
	}
}
