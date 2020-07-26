
const { mySpawn, postInstall } = require('./common');

// Variables
const appName = `messenger-dark`;

mySpawn('node', [
  './node_modules/nativefier7/lib/cli.js',
  '-e',
  '9.1.0',
  '--inject',
  'userstyles/messenger.js',
  '--single-instance',
  '-u',
  '"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  '--name',
  appName,
  "https://messenger.com/",
  appName
]).on('close', function(code) {
  postInstall(appName);
});
