const https = require('follow-redirects').https;
require('dotenv').config();

const apiKey = process.env.KEY;

const sample = {
  "id": 0,
  "description": "string",
  "displayOrder": 0,
  "duaCategoryId": 0,
  "duaMedias": [
    {
      "id": 0,
      "media": "string",
      "languageCode": "string",
      "mediaType": "IMAGE",
      "displayOrder": 0,
      "createdAt": "2024-01-09T10:37:01.159Z",
      "updatedAt": "2024-01-09T10:37:01.159Z",
      "status": "ACTIVE"
    }
  ],
  "name": "string",
  "status": "ACTIVE",
  "createdAt": "2024-01-09T10:37:01.159Z",
  "lastUpdatedAt": "2024-01-09T10:37:01.159Z"
};

async function callOpenAIAPI(param, body) {
  return new Promise((resolve, reject) => {
    try {
      const requestBody = {
        "messages": [
          { "role": "system", "content": "You are a helpful assistant." },
          { "role": "user", "content": param + JSON.stringify(body) }
        ],
        'model': 'gpt-3.5-turbo'
      };

      const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      };

      const req = https.request(options, (res) => {
        let chunks = [];

        // Collect data from the response
        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const responseData = Buffer.concat(chunks).toString(); // Convert buffer to string

          // console.log('Full API Response:', responseData); // Log the entire response for debugging

          try {
            // Parse the response data as JSON
            const jsonResponse = JSON.parse(responseData);

            // Check if 'choices' field exists and has content
            if (jsonResponse.choices && jsonResponse.choices.length > 0) {
              const content = jsonResponse.choices[0].message.content;
              resolve(content); // Return the response content as a string
            } else {
              reject('No choices field in the response or choices is empty');
            }
          } catch (error) {
            reject('Failed to parse response as JSON: ' + error.message);
          }
        });
      });

      req.on('error', (err) => {
        reject('Request failed: ' + err.message);
      });

      // Write the request body and send the request
      req.write(JSON.stringify(requestBody));
      req.end();
    } catch (error) {
      reject('API call failed: ' + error.message);
    }
  });
}


// // Call the function
// callOpenAIAPI(randomDataMsg,)
//   .then(response => {
//     // Handle the successful response
//     console.log('Response:', response);  // This will log the content of the response (string)
//   })
//   .catch(error => {
//     // Handle any rejection (e.g., API errors, no choices, etc.)
//     console.error('Error:', error);  // This will log errors such as no choices, API failure, etc.
//   });


const assertionMsg = "Here is the response of the API, generate the proper assertion in RestAssured:\n";
const randomDataMsg = "Here is the response of the API, generate the random data for the response:\n";


async function fetchAndCallAgain() {
  const param1 = randomDataMsg  // First API call prompt
  const body = { someKey: "someValue" };  // Example body
  const apiKey = "your-api-key";  // Replace with your OpenAI API key

  try {
    // First API call
    const firstResponse = await callOpenAIAPI(param1, body);
    console.log("First Response:", firstResponse);  // Log the first response

    // Second API call using the first response as the new 'param'
    const param2 = firstResponse;  // Use the response from the first call as the new param
    const secondResponse = await callOpenAIAPI(param2, body);
    console.log("Second Response:", secondResponse);  // Log the second response

  } catch (error) {
    console.error('Error:', error);  // Handle errors if any
  }
}