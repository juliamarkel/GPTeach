const { Configuration, OpenAIApi } = require("openai");

export async function callGPT3(myPrompt, onResponse) {
	const configuration = new Configuration({
		// TODO: use env vars
		/* insert API key */
	});
	const openai = new OpenAIApi(configuration);

	console.log("what is my prompt??");
	console.log(myPrompt);

	openai
		.createCompletion({
			model: "text-davinci-003",
			prompt: myPrompt,
			temperature: 0.7,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			stop: ["TA:"],
		})
		.then(response => {
			console.log("i'm here!");
			console.log(response.data.choices[0].text);
			if (response.data.choices[0].text.trim().replace(/[\n]/gm, "") === "") {
				console.log("abort mission chief");
				onResponse("hmmm");
			} else if (
				response.data.choices[0].text.trim().replace(/[\n]/gm, "") === "Sally:"
			) {
				console.log("abort mission chief #2");
				onResponse("[no response ...]");
			} else {
				onResponse(response.data.choices[0].text);
			}
		});
}

// need to have some logic for the case where we don't get any response back...
// we need to just send the prompt again?
