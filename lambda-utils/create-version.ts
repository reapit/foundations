import * as fs from 'fs'
import * as AWS from 'aws-sdk'
import errorHandler from './error-handler'

const createVersion = async () => {

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
  
  await lambda.publishVersion(createFunctionParams, errorHandler);
}

export default createVersion