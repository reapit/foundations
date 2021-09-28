#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkStack } from './lib/cdk-stack';
import * as util from 'util'
const exec = util.promisify(require('child_process').exec)
import * as path from 'path'
import AdmZip from 'adm-zip'

const bootstrap = async () => {

  await exec('yarn build', {
    cwd: path.resolve(__dirname, '..'),
  })

  const zipper = new AdmZip()
  zipper.addLocalFile(path.resolve(__dirname, '..', 'dist', 'main.js'))
  zipper.writeZip(path.resolve(__dirname, '..', 'dist', 'main.zip'))

  const app = new cdk.App();
  new CdkStack(app, 'cloud-deployment-service', {
    /* If you don't specify 'env', this stack will be environment-agnostic.
    * Account/Region-dependent features and context lookups will not work,
    * but a single synthesized template can be deployed anywhere. */

    /* Uncomment the next line to specialize this stack for the AWS Account
    * and Region that are implied by the current CLI configuration. */
    // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

    /* Uncomment the next line if you know exactly what Account and Region you
    * want to deploy the stack to. */
    // env: { account: '123456789012', region: 'us-east-1' },

    /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  })
}

bootstrap()
