const homedir = require('os').homedir();
const { spawn } = require('child_process');
const Confirm = require('prompt-confirm');
const fs = require('fs');
const fsx = require('fs-extra');

module.exports = {
  mySpawn: (exec, params) => spawn(exec, params, {
    detached:true,
    stdio:"inherit"
  }),
  postInstall: (appName) => {
    const generatedDir = `${process.cwd()}/${appName}`
    const installRoot = `${homedir}/.nativefier`;
    const installPath = `${installRoot}/${appName}`;
    const binaryLinkPath = `${homedir}/.local/bin`;
    
    // Optional install
    return (new Confirm('Would you like to install the generated app?')).ask(function(yes) {
      if(!yes) {
        console.log(`Skipping install.`);
        return;
      }

      // Base install path
      if (!fs.existsSync(installRoot)) {
        console.log(`${installRoot} not found, creating.`)
        fs.mkdirSync(installRoot);
        
      }
      
      // Remove old version if it doesnt exist
      console.log(`Checking for previous generated installs ${installRoot}..`);
      if(fs.existsSync(installPath)) {
        console.log(`Found previous install  (${installRoot}) - removing.`);
        fs.rmdirSync(installPath, {recursive: true });
      }
      
      // Move to install path
      console.log(`Moving to ${installPath}`);
      const generatedFolderPath = `${generatedDir}/${fs.readdirSync(generatedDir).shift()}`;
      fsx.moveSync(generatedFolderPath, installPath);

      // Remove empty folder
      fsx.rmdirSync(generatedDir);

      // Find binary file
      const binaryPath = `${installPath}/${fs.readdirSync(installPath).filter(file => file.startsWith(appName)).shift()}`;
      console.log(binaryPath);

      return (new Confirm('Would you like to create binary shortcut? (Unix only)')).ask(function(yes) {
        if (!yes) {
          return;
        } 
        if(!fs.existsSync(binaryLinkPath)) {
          console.log(`${binaryLinkPath} not found, creating.`)
          fs.mkdirSync(binaryLinkPath, { recursive: true });
        }

        if(fs.existsSync(`${binaryLinkPath}/${appName}`)) {
          console.log(`${binaryLinkPath}/${appName} exists, removing.`)
          fs.unlinkSync(`${binaryLinkPath}/${appName}`);
        }

        fs.symlinkSync(binaryPath, `${binaryLinkPath}/${appName}`);
        console.log(`Shortcut created.`);
      });
    });
  }
}