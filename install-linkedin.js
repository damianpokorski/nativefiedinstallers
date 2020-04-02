

const { mySpawn, postInstall } = require('./common');

// Variables
const appName = `linkedin-dark`;

// Execute process
mySpawn('node', 
[
  './node_modules/nativefier8/lib/cli.js', 
  'https://www.linkedin.com/messaging/',
  '-e',
  '8.1.1',
  '--inject',
  'userstyles/linkedin.js',
  '--single-instance',
  '--name',
  appName,
  appName
]).on('close', function(code) {
  postInstall(appName);
});