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
    

    // Base install path
    if (!fs.existsSync(installRoot)) {
      console.log(`${installRoot} not found, creating.`)
      fs.mkdirSync(installRoot);
      
    }

    const generatedFolderPath = `${generatedDir}/${fs.readdirSync(generatedDir).shift()}`;

    return (new Confirm(`Would you like to create installer? Debian only`))
      .run()
      .then(function(yes) {
        if(!yes) {
          console.log(`Skipping installer building.`);
          return;
        }
        const installer = require('electron-installer-debian');
        const options = {
          src: generatedFolderPath,
          dest: 'dist/installers/',
          arch: 'amd64',
          bin: appName,
          name: appName,
          productName: appName,
          genericName: appName
        }
        return installer(options).then(result => {
          console.log(`Successfully created package in ${options.dest}`)
        }).catch(err => {
          console.error(err, err.stack);
        });
      }).then(() => {
        return (new Confirm(`Would you like to  install the app into your home directory ${installPath}`)).ask(function(yes) {
          if(!yes) {
            console.log(`Skipping install.`);
            return;
          }
    
          // Remove old version if it doesnt exist
          console.log(`Checking for previous generated installs ${installRoot}..`);
          if(fs.existsSync(installPath)) {
            console.log(`Found previous install  (${installRoot}) - removing.`);
            fs.rmdirSync(installPath, {recursive: true });
          }
          
          // Move to install path
          console.log(`Moving to ${installPath}`);
    
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
      })


    // Optional install
    
  }
}