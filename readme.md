# Automated API Test Utility Using OpenAI

## Project Overview
This project automates the process of:
- Generating **random data** to use as API payloads.
- Sending the data to a specified **REST API endpoint**.
- Generating **test case with assertions** for API responses based on the request and response data.

The project utilizes **OpenAI's generative capabilities** to ensure the data is realistic and assertions are accurate.

---

## Key Features

### 1. Random Data Generation
- Dynamically generates random, realistic data based on a provided structure.
- Leverages OpenAI's language model for data generation.

### 2. API Interaction
- Sends POST requests to a user-configured REST API endpoint.
- Handles response parsing and validation.

### 3. Test Case Generation
- Uses OpenAI to generate **assertions** for API responses.
- Compares API responses against the original payload for accuracy.

---

## How to Use

### 1. Configure API Endpoint
Update the `endpoints.js` file with the target API URL.
```javascript
module.exports = {
  apiUrl: "<YOUR_API_ENDPOINT>" // Replace with your target endpoint
};
```

### 2. Set Up OpenAI API Key
Set the `OPENAI_API_KEY` environment variable with your OpenAI API key.


### 3. Run the Script
Execute the script to generate data, send the API request, and validate the response.
```
node src/main.js
```

---

## Enhancements (Planned)

### Scope
- Extend support to handle multiple HTTP methods (GET, PUT, DELETE).
- Generate end-to-end test flows with chained API calls.

### Support (Languages and IDEs)
- Expand compatibility with IDEs like VSCode, IntelliJ, and PyCharm.
- Support additional programming languages for broader adoption.

---

## Dependencies
- **Node.js** (v14 or later)
- **Axios**: For handling HTTP requests.
- **OpenAI API**: For generating data and assertions.

---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any feature enhancements or bug fixes.

---

## Contact
For queries, suggestions, or issues, please open an issue on the repository or contact the project maintainers.

Happy testing! :rocket:
