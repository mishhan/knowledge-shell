import vest, { test, enforce } from "vest";

interface IKnowledgeBase {
	kbName: string;
	kbDescription: string;
}

export default vest.create((data: IKnowledgeBase, cnahgedField: string) => {
	vest.only(cnahgedField);

	test("kbName", "fields.validation_errors.required", () => {
		enforce(data.kbName).isNotEmpty();
	});

	test("kbDescription", "fields.validation_errors.required", () => {
		enforce(data.kbDescription).isNotEmpty();
	});
});
