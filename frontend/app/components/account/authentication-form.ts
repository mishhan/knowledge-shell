import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import userAuthenticationValidator from "knowledge-shell/validations/user-authentication";

interface AccountAuthenticationFormArgs {
	authenticate: (identification: string, password: string) => void;
	isLoading: boolean;
}

export default class AccountAuthenticationForm extends Component<AccountAuthenticationFormArgs> {
	@tracked isSubmitted!: boolean;

	@tracked identification!: string;
	@tracked password!: string;
	@tracked showPassword = false;
	@tracked validator = userAuthenticationValidator.get();

	get identificationValidationErrors(): string[] {
		const identificationValidationErrors = this.validator.getErrors("identification");
		return identificationValidationErrors;
	}

	get passwordValidationErrors(): string[] {
		const passwordValidationErrors = this.validator.getErrors("password");
		return passwordValidationErrors;
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
		const { identification, password } = this;
		this.validator = userAuthenticationValidator(
			{
				identification,
				password,
			},
			fieldName,
		);
	}
}
