import vest, { test, enforce } from "vest";

interface IKnowledgeBase {
	name: string;
	description: string;
}

export default vest.create((data: IKnowledgeBase, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("name", "form.validation_errors.required_field", () => {
		enforce(data.name).isNotEmpty();
	});

	test("description", "form.validation_errors.required_field", () => {
		enforce(data.description).isNotEmpty();
	});
});
