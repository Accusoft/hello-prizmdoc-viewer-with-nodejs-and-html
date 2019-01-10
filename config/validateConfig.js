const CONFIG_FILENAME = 'config.json5';
const config = require('./loadConfig');
const pas = require('../pas/pasRequest').defaults({
  simple: false
});

const PRIZMDOC_CLOUD_PAS_BASE_URL = 'https://api.accusoft.com/prizmdoc';
const PLACEHOLDER_API_KEY = 'YOUR_API_KEY';

function notConfigured() {
  return config.pasBaseUrl === PRIZMDOC_CLOUD_PAS_BASE_URL && config.apiKey === PLACEHOLDER_API_KEY;
}

async function validateConfig() {
  if (notConfigured()) {
    console.error(`ERROR: You need to edit ${CONFIG_FILENAME} to configure your connection to PAS (PrizmDoc Application Services). If you're just getting started, you can use our hosted PrizmDoc Cloud service; all you need to do is configure your API key. Visit https://cloud.accusoft.com to sign up for an account and get an API key at no cost. See the README.md file for more information.`);
    process.exit(0);
  }

  const res = await pas.post('/ViewingSession', {
    json: {
      source: {
        type: 'upload',
        displayName: 'test'
      }
    }
  });

  if (res.statusCode !== 200) {
    if (res.statusCode === 401 && res.body.errorCode === 'Unauthorized') {
      console.error('ERROR: Invalid API key.');
    } else {
      console.error(`ERROR: Unexpected response when trying to contact PAS. Have you configured the connection to PrizmDoc Application Services correctly in ${CONFIG_FILENAME}? Your "pasBaseUrl" may be incorrect. See the README for more information.`);
    }

    process.exit(0);
  }
}

module.exports = validateConfig;
