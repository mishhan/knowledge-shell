export default class Stack<T> {
	private readonly storage: T[] = [];

	public get size(): number {
		return this.storage.length;
	}

	public get isEmpty(): boolean {
		return this.storage.length === 0;
	}

	public push(item: T): void {
		this.storage.push(item);
	}

	public pop(): T | undefined {
		return this.storage.pop();
	}

	public peek(): T {
		return this.storage[this.size - 1];
	}

	public toArray(): T[] {
		return this.storage;
	}

	public clear(): void {
		this.storage.clear();
	}
}
