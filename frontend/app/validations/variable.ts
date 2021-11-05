import vest, { test, enforce } from "vest";
import { Domain, VariableType } from "knowledge-shell/models";

interface IVariable {
	name: string;
	description: string;
	question: string;
	variableType: VariableType;
	domain: Domain;
	nameCollection: string;
}

export default vest.create((data: IVariable, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("name", "form.validation_errors.required_field", () => {
		enforce(data.name).isNotEmpty();
	});

	test("name", "form.validation_errors.unique_name", () => {
		enforce(data.name).notInside(data.nameCollection);
	});

	test("description", "form.validation_errors.required_field", () => {
		enforce(data.description).isNotEmpty();
	});

	if (data.variableType !== VariableType.Derrivable) {
		test("question", "form.validation_errors.required_field", () => {
			enforce(data.question).isNotEmpty();
		});
	}

	test("variableType", "form.validation_errors.required_field", () => {
		enforce(data.variableType).isNumber();
	});

	test("domain", "form.validation_errors.required_field", () => {
		enforce(data.domain).isNotNull();
	});
});
