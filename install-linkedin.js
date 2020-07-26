

const { mySpawn, postInstall } = require('./common');

// Variables
const appName = `linkedin-dark`;

// Execute process
mySpawn('node', 
[
  './node_modules/nativefier7/lib/cli.js', 
  '-e',
  '9.1.0',
  '--inject',
  'userstyles/linkedin.js',
  '--single-instance',
  '--name',
  appName,
  'https://www.linkedin.com/messaging/',
  appName
]).on('close', function(code) {
  postInstall(appName);
});

