import AdmZip from 'adm-zip'
import path from 'path'
import child_process from 'child_process'

import { AssetCode } from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'

import { createApi } from './components/api'
import { createFunction } from './components/function'

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

  const lambdaFunction = createFunction(stack, 'graphql', AssetCode.fromAsset(distZip), handler)
  const api = createApi(stack, 'api', lambdaFunction)
  output(stack, 'api-url', api.url)
}
