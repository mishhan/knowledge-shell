export default function sort<T>(collection: Array<T>, sortField: string, sortDirection: string = "asc"): Array<T> {
	if (collection.length === 0) return collection;

	// @ts-ignore
	const firstElement = collection[0].get(sortField);
	if (typeof firstElement === "string") {
		const sortedCollection = collection.sort((prev: T, next: T) => {
			// @ts-ignore
			const prevFiled = prev.get(sortField) as string;
			// @ts-ignore
			const nextField = next.get(sortField) as string;
			return prevFiled.localeCompare(nextField);
		});
		return sortDirection === "asc" ? sortedCollection : sortedCollection.reverse();
	}

	if (typeof firstElement === "number") {
		const sortedCollection = collection.sort((prev: T, next: T) => {
			// @ts-ignore
			const prevFiled = prev.get(sortField) as number;
			// @ts-ignore
			const nextField = next.get(sortField) as number;
			return prevFiled - nextField;
		});
		return sortDirection === "asc" ? sortedCollection : sortedCollection.reverse();
	}

	if (firstElement instanceof Date) {
		const sortedCollection = collection.sort((prev: T, next: T) => {
			// @ts-ignore
			const prevFiled = prev.get(sortField) as Date;
			// @ts-ignore
			const nextField = next.get(sortField) as Date;
			// @ts-ignore
			return prevFiled - nextField;
		});
		return sortDirection === "asc" ? sortedCollection : sortedCollection.reverse();
	}

	return collection;
}
