import * as fs from 'fs'
import * as AWS from 'aws-sdk'
import errorHandler from './error-handler'

const newLambda = async () => {

  const region = 'eu-west-2';
  
  const apiVersion = 'latest';
  const lambda = new AWS.Lambda({ apiVersion, region });
  const zipContents = fs.readFileSync('app.zip');
  const roleArn = ''
  
  const createFunctionParams = {
    Code: {
      ZipFile: zipContents,
    },
    FunctionName: 'app',
    Handler: 'app.handler',
    Role: roleArn,
    Runtime: 'nodejs10.x',
  };
  
  await lambda.createFunction(createFunctionParams, errorHandler);
}

export default newLambda