var semverMajor = require('semver/functions/major');

if (semverMajor(process.version) < 8) {
  console.error('-------------------------------------------------------');
  console.error('ERROR: Sorry, this sample requires Node.js 8 or higher!');
  console.error('       Try again with a newer version of node.');
  console.error('-------------------------------------------------------');
  process.exit(1);
}
