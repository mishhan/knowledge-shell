import Response from "ember-cli-mirage/response";

export default function() {
	this.passthrough("/write-coverage");
	this.urlPrefix = "http://localhost:55836";
	this.namespace = "";
	this.timing = 100;

	this.post("/token", (schema, request) => {
		return { "access_token": "access_token" };
	});

	this.post("/sign-up", (schema, request) => {
		return new Response(200);
	})


	this.resource("knowledge-bases");
	this.resource("frame-bases");
	this.resource("production-bases");
}
