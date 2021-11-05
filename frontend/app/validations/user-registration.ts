import vest, { test, enforce } from "vest";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import isEmail from "validator/es/lib/isEmail";

enforce.extend({ isEmail });
enforce.extend({ isStrongPassword });

interface IUserRegistration {
	userName: string;
	password: string;
	email: string;
	acceptTerms: boolean;
}

export default vest.create((data: IUserRegistration, cnahgedField: string) => {
	vest.only(cnahgedField);

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
