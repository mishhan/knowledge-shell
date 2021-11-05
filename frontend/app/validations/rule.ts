import vest, { test, enforce } from "vest";

interface IRule {
	name: string;
	reason: string;
	premise: string;
	consequence: string;
}

export default vest.create((data: IRule, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("name", "form.validation_errors.required_field", () => {
		enforce(data.name).isNotEmpty();
	});

	test("reason", "form.validation_errors.required_field", () => {
		enforce(data.reason).isNotEmpty();
	});

	test("premise", "form.validation_errors.required_field", () => {
		enforce(data.premise).isNotEmpty();
	});

	test("consequence", "form.validation_errors.required_field", () => {
		enforce(data.consequence).isNotEmpty();
	});
});
