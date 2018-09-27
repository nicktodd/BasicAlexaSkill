/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const LauncherHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    // get the slot value
    return handlerInput.responseBuilder
      .speak("hello, please tell me your name" )
       .reprompt("what is your name")
      .withSimpleCard(SKILL_NAME, "Hello, please tell me your name ")
      .getResponse();
  },
};

const GetUserNameHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return  (request.type === 'IntentRequest'
        && request.intent.name === 'getusersname');
  },
  handle(handlerInput) {
    // get the slot value
    const request = handlerInput.requestEnvelope.request;
    const userName = request.intent.slots.name.value; 
    
    // speak the result with the slot value in it
    return handlerInput.responseBuilder
      .speak("hello " + userName )
      .withSimpleCard(SKILL_NAME, "Hello " + userName)
      .getResponse();
  },
};



const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Say Hello';
const HELP_MESSAGE = 'Tell me your name and I will say hello';
const HELP_REPROMPT = 'Please say your name again';
const STOP_MESSAGE = 'Goodbye!';


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LauncherHandler,
    GetUserNameHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();