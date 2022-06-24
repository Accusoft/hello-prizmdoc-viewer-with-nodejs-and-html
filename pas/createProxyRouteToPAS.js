// Proxy which allows the viewer to send requests through this web application back to PrizmDoc.
const { createProxyMiddleware } = require('http-proxy-middleware');

function createProxyRouteToPAS(path, pasBaseUrl, apiKey) {
  if (pasBaseUrl === undefined) {
    throw new Error('pasBaseUrl argument is required when constructing the proxy route to PAS');
  }

  if (typeof(pasBaseUrl) !== 'string') {
    throw new Error('pasBaseUrl must be a string');
  }

  if (apiKey !== undefined && typeof(apiKey) !== 'string') {
    throw new Error('When provided, apiKey must be a string');
  }

  let pathRewrite = {};
  pathRewrite['^' + path] = ''; // remove the proxy path part of the route when forwarding the request
  let headers = {};

  if (apiKey !== undefined) {
    headers['acs-api-key'] = apiKey;
  }

  return createProxyMiddleware(path, {
    pathRewrite: pathRewrite,
    target: pasBaseUrl,
    changeOrigin: true, // necessary when converting from HTTP to HTTPS
    headers
  });
}

module.exports = createProxyRouteToPAS;
