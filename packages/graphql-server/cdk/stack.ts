import AdmZip from 'adm-zip'
import path from 'path'
import child_process from 'child_process'

import { AssetCode } from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import * as apigateway from '@aws-cdk/aws-apigateway'
import * as cognito from '@aws-cdk/aws-cognito'

import { createApi } from './components/api'
import { createFunction } from './components/function'

import config from '../config.json'

const exec = child_process.execSync

const output = (stack: cdk.Stack, name: string, value: string) => {
  stack.exportValue(value, {
    name: `${stack.stackName}-${name}`,
  })
}

export const createStack = (scope: cdk.App, name: string) => {
  const stack = new cdk.Stack(scope, name)
  console.log('building...')
  exec('yarn build', {
    cwd: path.resolve(__dirname, '..'),
  })

  const distFolder = path.join(__dirname, '..', 'dist')
  const distZip = distFolder + '.zip'

  const zipper = new AdmZip()
  zipper.addLocalFolder(distFolder)
  zipper.writeZip(distZip)

  if (!process.env.NPM_TOKEN) {
    throw new Error('NPM_TOKEN is required')
  }

  const handler = 'index.graphqlHandler'

  const userPool = cognito.UserPool.fromUserPoolId(stack, 'UserPool', config.COGNITO_USERPOOL_ID)
  const authorizer = new apigateway.CognitoUserPoolsAuthorizer(stack, 'authorizer', {
    cognitoUserPools: [userPool]
  })

  const lambdaFunction = createFunction(stack, 'graphql', AssetCode.fromAsset(distZip), handler, config)
  const api = createApi(stack, 'api', lambdaFunction, {
    authorizationType: apigateway.AuthorizationType.COGNITO,
    authorizer,
  })
  output(stack, 'api-url', api.url)
}
