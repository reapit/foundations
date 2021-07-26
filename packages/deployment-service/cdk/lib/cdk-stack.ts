import * as cdk from '@aws-cdk/core';
import { DeploymentStack } from './deployment-stack';

const prefix = 'cloud-'

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const app = new cdk.App()

    const stagingStack = new DeploymentStack(app, prefix, 'staging')
  }
}
