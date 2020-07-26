const homedir = require('os').homedir();
const { spawn } = require('child_process');
const Confirm = require('prompt-confirm');
const fs = require('fs');
const fsx = require('fs-extra');

const ezConfirm = (question, skip = false) => skip ? Promise.resolve() : (new Promise((resolve, reject) => (new Confirm(question)).run().then(answer => answer ? resolve() : reject())));

module.exports = {
  mySpawn: (exec, params) => spawn(exec, params, {
    detached:true,
    stdio:"inherit"
  }),
  postInstall: (appName) => {
    const generatedDir = `${process.cwd()}/${appName}`
    const installRoot = `${homedir}/.nativefier`;
    
    // Base install path
    if (!fs.existsSync(installRoot)) {
      console.log(`${installRoot} not found, creating.`)
      fs.mkdirSync(installRoot);
      
    }

    const generatedFolderPath = `${generatedDir}/${fs.readdirSync(generatedDir).shift()}`;

    return ezConfirm(`Would you like to create installer? Debian only`, process.argv.pop() == '-y').then(() => {
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
    }).catch(() => console.log(`Skipping installer building.`))
    .catch(() => 'Done');
  }
}