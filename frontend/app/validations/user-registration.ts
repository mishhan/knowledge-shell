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

	test("userName", "fields.validation_errors.required", () => {
		enforce(data.userName).isNotEmpty();
	});

	test("userName", "fields.validation_errors.gte_3", () => {
		enforce(data.userName).longerThanOrEquals(3);
	});

	test("email", "fields.validation_errors.required", () => {
		enforce(data.email).isNotEmpty();
	});

	test("email", "fields.validation_errors.email", () => {
		enforce(data.email).isEmail();
	});

	test("password", "fields.validation_errors.required", () => {
		enforce(data.password).isNotEmpty();
	});

	test("password", "fields.validation_errors.strong_password", () => {
		enforce(data.password).isStrongPassword();
	});

	test("acceptTerms", "fields.validation_errors.tof", () => {
		enforce(data.acceptTerms).isTruthy();
	});
});
