const callOpenAIAPI  = require('./utils/openApiCaller'); // Import the function

const generateRandomDataUsingAI = require('./utils/dataGenerator');
const samplePayload = require('../data/input/requestPayloadStructure');
const endpoints = require('../config/endpoints')
const postToApi = require('../src/utils/apiCaller')

async function fetchAndCallAgain() {
  
  try {
     // Generate random data using OpenAI
     const randomData = await generateRandomDataUsingAI(samplePayload);
     console.log("Generated Random Data:", randomData);
 
     // Hit the API with the generated data and get the response
     const addObjectsEP = endpoints['addObjects'];
     const apiResponse = await postToApi(addObjectsEP, randomData); 
     console.log("API Response:", apiResponse);

    // Proceed with API calls and assertion generation
    const assertionMsg = "Generate hamcrest RestAssured assertion for the request payload against the API response received, use JsonPath to dynamically extract values from the request payload and compare it with the response"+
                          +JSON.stringify(randomData,2,null)+ 
                          +"Do not use hardcoded values for comparison; instead, use JsonPath to extract each field value from the response";
    const assertionResponse = await callOpenAIAPI(assertionMsg, randomData);
    console.log("Assertion Generation Response:", assertionResponse);
  } catch (error) {
    console.error('Error during OpenAI interactions:', error);
  }
}

fetchAndCallAgain();
