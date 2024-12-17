const callOpenAIAPI = require('./openApiCaller');
const writeToFile = require('../utils/fileWriter'); // Assuming this is your utility to write to a file
const path = require('path');

async function generateRandomDataUsingAI(payload) {
  try {
    // Make the API call to OpenAI to generate random data
    const response = await callOpenAIAPI("Generate real time JSON serialized random data based on the structure provided:", payload);

    // Extract the JSON portion from the content
    const jsonMatch = response.match(/```json\n([\s\S]+?)\n```/);

    console.log("JsonResponse:", jsonMatch);

    if (jsonMatch && jsonMatch[1]) {
      const randomData = JSON.parse(jsonMatch[1]); // Parse the extracted JSON string

      // Save the generated random data to a file
      const outputPath = path.resolve('./data/Output/randomRequestPayload.json');
      await writeToFile(outputPath, randomData);
      console.log(`Random Payload saved to: ${outputPath}`);

      return randomData;
    } else {
      throw new Error("No valid JSON found in OpenAI response");
    }
  } catch (error) {
    console.error("Error generating random data with OpenAI:", error);
    throw error;
  }
}

module.exports = generateRandomDataUsingAI;
