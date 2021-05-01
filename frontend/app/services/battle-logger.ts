import Service from "@ember/service";

export default class BattleLogger extends Service {
	messages: string[] = [];

	errors: string[] = [];

	addMessage(message: string): void {
		this.messages.pushObject(message);
	}

	addError(error: string): void {
		this.errors.pushObject(error);
	}
}

declare module "@ember/service" {
	interface Registry {
		"battle-logger": BattleLogger;
	}
}
