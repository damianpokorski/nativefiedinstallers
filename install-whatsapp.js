

const { mySpawn, postInstall } = require('./common');

// Variables
const appName = `whatsapp-dark`;


// Execute process
mySpawn('node', 
[
  './node_modules/nativefier7/lib/cli.js', 
  '-e',
  '9.1.0',
  '--inject',
  'userstyles/whatsapp.js',
  '--single-instance',
  '--name',
  appName,
  "https://web.whatsapp.com",
  appName
]).on('close', function(code) {
  postInstall(appName);
});