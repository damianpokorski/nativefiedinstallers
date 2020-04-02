

const { mySpawn, postInstall } = require('./common');

// Variables
const appName = `whatsapp-dark`;


// Execute process
mySpawn('node', 
[
  './node_modules/nativefier8/lib/cli.js', 
  "https://web.whatsapp.com",
  '-e',
  '7.1.11',
  '--inject',
  'userstyles/whatsapp.js',
  '--single-instance',
  '--name',
  appName,
  appName
]).on('close', function(code) {
  postInstall(appName);
});