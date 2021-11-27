import Inflector from "ember-inflector";

export function initialize(): void {
	const { inflector } = Inflector;
	inflector.irregular("frame-base", "frame-bases");
	inflector.irregular("production-base", "production-bases");
}

export default {
	initialize,
};
