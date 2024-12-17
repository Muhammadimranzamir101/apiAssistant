require('dotenv').config();

const openaiConfig = {
  apiKey: process.env.KEY,
  hostname: 'api.openai.com',
  port: 443,
  path: '/v1/chat/completions'
};

module.exports = openaiConfig;
