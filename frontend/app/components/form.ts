import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import type IntlService from "ember-intl/services/intl";

export default abstract class Form<T> extends Component<T> {
	@service
	protected intl!: IntlService;

	/**
	 * Validator
	 */
	@tracked
	protected validator!: any;

	/**
	 * Indicates form state
	 */
	@tracked
	protected isSubmitted!: boolean;

	/**
	 * Returns field validation state
	 * @param fieldName - field to validate
	 * @returns validation state
	 */
	protected getFieldValidation(fieldName: string): { errors: string[]; isValid: boolean; isInValid: boolean } {
		const errors = this.validator.getErrors(fieldName).map((errorKey: string) => this.intl.t(errorKey));
		const isValid = this.isSubmitted && errors.length === 0;
		const isInValid = this.isSubmitted && errors.length > 0;
		return {
			errors,
			isValid,
			isInValid,
		};
	}

	/**
	 * Validates form
	 * @param validator - form validator
	 * @param fieldName - field to validate
	 */
	protected validateForm(validator: any, fieldName?: string): void {
		this.validator = validator(this, fieldName);
	}
}
