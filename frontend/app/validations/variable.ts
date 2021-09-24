import vest, { test, enforce } from "vest";
import { Domain, VariableType } from "knowledge-shell/models";

interface IVariable {
	name: string;
	description: string;
	question: string;
	variableType: VariableType;
	domain: Domain;
}

export default vest.create((data: IVariable, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("name", "fields.validation_errors.required", () => {
		enforce(data.name).isNotEmpty();
	});

	test("description", "fields.validation_errors.required", () => {
		enforce(data.description).isNotEmpty();
	});

	if (data.variableType !== VariableType.Derrivable) {
		test("question", "fields.validation_errors.required", () => {
			enforce(data.question).isNotEmpty();
		});
	}

	test("variableType", "fields.validation_errors.required", () => {
		enforce(data.variableType).isNumber();
	});

	test("domain", "fields.validation_errors.required", () => {
		enforce(data.domain).isNotNull();
	});
});
