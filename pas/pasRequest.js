const config = require('../config/loadConfig');

// Configure a request instance for making HTTP calls to PAS
const request = require('request-promise').defaults({
  baseUrl: config.pasBaseUrl,
  headers: {
    'acs-api-key': config.apiKey,           // Inject our API key (for PrizmDoc Cloud)
    'Accusoft-Secret': config.pasSecretKey  // Inject our PAS secret key (for self-hosted PAS)
  },
  resolveWithFullResponse: true
});
request.debug = true;

module.exports = request;
