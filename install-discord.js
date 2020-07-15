

const { mySpawn, postInstall } = require('./common');

// Variables
const appName = `discord-dark`;


// Execute process
mySpawn('node', 
[
  './node_modules/nativefier7/lib/cli.js', 
  '-e',
  '9.1.0',
  '--inject',
  'userstyles/discord.js',
  '--single-instance',
  '--name',
  appName,
  "https://discordapp.com/login",
  appName
]).on('close', function(code) {
  postInstall(appName);
});
