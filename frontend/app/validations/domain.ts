import vest, { test, enforce } from "vest";
import { DomainType } from "knowledge-shell/models";

interface IDomain {
	name: string;
	description: string;
	domainType: DomainType;
}

export default vest.create((data: IDomain, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("name", "fields.validation_errors.required", () => {
		enforce(data.name).isNotEmpty();
	});

	test("description", "fields.validation_errors.required", () => {
		enforce(data.description).isNotEmpty();
	});

	test("description", "fields.validation_errors.required", () => {
		enforce(data.domainType).isNumber();
	});
});
