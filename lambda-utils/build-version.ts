import * as childProcess from 'child_process'

const buildVersion = () => {
  childProcess.execSync(`cd ./public && zip app.zip app.js`);
}

export default buildVersion()