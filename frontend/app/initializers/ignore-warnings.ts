import { registerWarnHandler } from "@ember/debug";
// github.com/embermap/ember-data-storefront/issues/24#issuecomment-378520128

const IGNORED_WARNINGS = ["ds.store.push-link-for-sync-relationship"];

function ignoreWarning(options: { id: string }): boolean {
	const hasNamedOption = options && options.id !== "";
	return hasNamedOption && IGNORED_WARNINGS.includes(options.id);
}

export function initialize(): void {
	registerWarnHandler((_message, options, next) => {
		if (!ignoreWarning(options)) {
			next(_message, options);
		}
	});
}

export default {
	initialize,
};
