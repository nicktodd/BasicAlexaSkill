const va = require("virtual-alexa");
let alexa = null;

beforeAll(() => {
    alexa = va.VirtualAlexa.Builder()
    .handler("./index.handler") // Lambda function file and name
    .interactionModelFile("../../models/en-US.json") // Path to interaction model file
    .create();
});

it('should return hello Nick if Nick is the name provided', async () => {
    payload = await alexa.utter("my name is Nick");//.then((payload) => {
    console.log("OutputSpeech: " + payload.response.outputSpeech.ssml);
    expect((payload.response.outputSpeech.ssml).toLowerCase())
            .toContain("hello nick");
});