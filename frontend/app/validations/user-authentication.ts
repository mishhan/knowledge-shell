import vest, { test, enforce } from "vest";

interface IUserAuthentication {
	identification: string;
	password: string;
}

export default vest.create((data: IUserAuthentication, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("identification", "form.validation_errors.required_field", () => {
		enforce(data.identification).isNotEmpty();
	});

	test("password", "form.validation_errors.required_field", () => {
		enforce(data.password).isNotEmpty();
	});
});
