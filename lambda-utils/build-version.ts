import * as childProcess from 'child_process'

const buildVersion = () => {
  childProcess.execSync(`cd ./public && zip -r app.zip *`);
}

export default buildVersion()