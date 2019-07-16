const childProcess = require('child_process');
const AWS = require('aws-sdk');
const fs = require('fs');

const zipProject = async () => childProcess.execSync('zip app.zip app.js');

const genericCallback = (err, data) => {
  if (err) {
    console.log('ERROR', err);
  } else {
    console.log('SUCCSESS', data);
  }
};

const deploy = async () => {

  const region = 'eu-west-2';
  
  const apiVersion = 'latest';
  const lambda = new AWS.Lambda({ apiVersion, region });
  const zipContents = fs.readFileSync('app.zip');
  
  const createFunctionParams = {
    Code: {
      ZipFile: zipContents,
    },
    FunctionName: 'app',
    Handler: 'app.handler',
    Role: roleArn,
    Runtime: 'nodejs10.x',
  };
  
  await lambda.createFunction(createFunctionParams, genericCallback);
}

const publishVersion = async () => {

  const region = 'eu-west-2';
  
  const apiVersion = 'latest';
  const lambda = new AWS.Lambda({ apiVersion, region });
  const zipContents = fs.readFileSync('app.zip');
  
  const createFunctionParams = {
    Code: {
      ZipFile: zipContents,
    },
    FunctionName: 'app',
    // Handler: 'app.handler',
    // // Role: roleArn,
    // Runtime: 'nodejs10.x',
    RevisionId: '1.1'
  };
  
  await lambda.publishVersion(createFunctionParams, genericCallback);
}

const updateFunctionCode = async () => {
  const region = 'eu-west-2';
  
  const apiVersion = 'latest';
  const lambda = new AWS.Lambda({ apiVersion, region });
  const zipContents = fs.readFileSync('app.zip');
  
  const createFunctionParams = {
    ZipFile: zipContents,
    FunctionName: 'app',
    // Handler: 'app.handler',
    // Role: roleArn,
    // Runtime: 'nodejs10.x',
    // RevisionId: '1.1',
    Publish: true
  };  
  await lambda.updateFunctionCode(createFunctionParams, genericCallback);
}

const startApp = async () => {

  const region = 'eu-west-2';
  
  const apiVersion = 'latest';
  const lambda = new AWS.Lambda({ apiVersion, region });
  const invokeParams = { FunctionName: 'app' };
  
  await lambda.invoke(invokeParams, genericCallback);
}

// module.exports = {
//   startApp
// }

module.exports = (async () => {
  // await zipProject()
  // await deploy()
  // await updateFunctionCode()
  // await publishVersion()
  await startApp()
})()