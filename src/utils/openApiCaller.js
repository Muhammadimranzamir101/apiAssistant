const https = require('https');
require('dotenv').config();

const apiKey = process.env.KEY;

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

          console.log('Full API Response:', responseData); // Log the entire response for debugging

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

module.exports = callOpenAIAPI;
