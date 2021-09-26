import vest, { test, enforce } from "vest";

interface IKnowledgeBase {
	name: string;
	description: string;
}

export default vest.create((data: IKnowledgeBase, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("name", "fields.validation_errors.required", () => {
		enforce(data.name).isNotEmpty();
	});

	test("description", "fields.validation_errors.required", () => {
		enforce(data.description).isNotEmpty();
	});
});
