import vest, { test, enforce } from "vest";

interface IUserAuthentication {
	identification: string;
	password: string;
}

export default vest.create((data: IUserAuthentication, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("identification", "fields.validation_errors.required", () => {
		enforce(data.identification).isNotEmpty();
	});

	test("password", "fields.validation_errors.required", () => {
		enforce(data.password).isNotEmpty();
	});
});
