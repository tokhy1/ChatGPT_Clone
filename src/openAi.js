import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: "api_key"  // replace your api
});

const openai = new OpenAIApi(configuration);

async function sendMessageToOpenAi(message) {
    const response = await openai.createCompletion({
        engine: 'text-davinci-003',
        prompt: message,
        max_tokens: 32,
        n: 1,
        stop: '.',
        temperature: 0.5,
    });
    return response.data.choices[0].text
}

export { sendMessageToOpenAi };
