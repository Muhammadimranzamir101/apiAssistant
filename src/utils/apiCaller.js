const https = require('https');
const writeToFile = require('../utils/fileWriter');
const path = require('path');

async function postToApi(apiUrl, payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(apiUrl, options, (res) => {
      let chunks = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', async () => {
        try {
          const responseData = JSON.parse(Buffer.concat(chunks).toString());
          console.log("API Response:", responseData);

          // Save the response to a file
          const outputPath = path.resolve('./data/Output/apiResponse.json');
          await writeToFile(outputPath, responseData);
          console.log(`API Response saved to: ${outputPath}`);

          // Resolve the promise with the response data
          resolve(responseData);
        } catch (error) {
          reject(`Failed to parse response: ${error.message}`);
        }
      });
    });

    req.on('error', (err) => {
      reject(`Request failed: ${err.message}`);
    });

    req.write(JSON.stringify(payload));
    req.end();
  });
}

module.exports = postToApi;
