import { helper } from "@ember/component/helper";

/**
 * @see https://github.com/DockYard/ember-composable-helpers/blob/master/addon/helpers/inc.js
 */
export function inc([step, val]: [number, number?]): number {
	if (val === undefined) {
		// eslint-disable-next-line no-param-reassign
		val = 1;
	}

	const stepNumber = Number(step);
	const valNumber = Number(val);

	return stepNumber + valNumber;
}

export default helper(inc);
