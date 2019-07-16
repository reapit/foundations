import errorHandler from './error-handler';
import * as AWS from 'aws-sdk';

const pingLambda = async () => {

  const region = 'eu-west-2';
  
  const apiVersion = 'latest';
  const lambda = new AWS.Lambda({ apiVersion, region });
  const invokeParams = { FunctionName: 'app' };
  
  await lambda.invoke(invokeParams, errorHandler);
}

export default pingLambda()