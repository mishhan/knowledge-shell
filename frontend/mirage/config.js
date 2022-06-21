import Response from "ember-cli-mirage/response";
import ENV from "knowledge-shell/config/environment";

export default function() {
	this.passthrough("/write-coverage");
	this.urlPrefix = ENV.APP.host;
	this.namespace = "";
	this.timing = 100;

	this.post("/token", (schema, request) => {
		return { "access_token": "access_token" };
	});

	this.post("/sign-up", (schema, request) => {
		return new Response(200);
	});


	this.resource("knowledge-bases");
	this.resource("frame-bases");
	this.resource("frames");
	this.resource("slots");
	this.resource("domain-value-frames");
	this.resource("production-bases");
	this.resource("variables");
	this.resource("rules");
	this.resource("domains");
	this.resource("domain-values");
	this.resource("domain-value-numbers");
	this.resource("domain-value-strings");
	this.resource("positions");
}
