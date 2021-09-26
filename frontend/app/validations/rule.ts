import vest, { test, enforce } from "vest";

interface IRule {
	name: string;
	reason: string;
	premise: string;
	consequence: string;
}

export default vest.create((data: IRule, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("name", "fields.validation_errors.required", () => {
		enforce(data.name).isNotEmpty();
	});

	test("reason", "fields.validation_errors.required", () => {
		enforce(data.reason).isNotEmpty();
	});

	test("premise", "fields.validation_errors.required", () => {
		enforce(data.premise).isNotEmpty();
	});

	test("consequence", "fields.validation_errors.required", () => {
		enforce(data.consequence).isNotEmpty();
	});
});
