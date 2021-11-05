import vest, { test, enforce } from "vest";
import { DomainType } from "knowledge-shell/models";

interface IDomain {
	name: string;
	description: string;
	domainType: DomainType;
	nameCollection: string[];
}

export default vest.create((data: IDomain, cnahgedField: string) => {
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

	test("description", "form.validation_errors.required_field", () => {
		enforce(data.domainType).isNumber();
	});
});
