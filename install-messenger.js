
const { mySpawn, postInstall } = require('./common');

// Variables
const appName = `messenger-dark`;

mySpawn('node', [
  './node_modules/nativefier8/lib/cli.js',
  "https://messenger.com/",
  '--single-instance',
  '-e',
  '8.1.1',
  '--inject',
  'userstyles/messenger.js',
  '-u',
  '"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  '--name',
  appName,
  appName
]).on('close', function(code) {
  postInstall(appName);
});
