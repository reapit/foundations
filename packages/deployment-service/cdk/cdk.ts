#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { CdkStack } from './lib/cdk-stack'
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

  const app = new cdk.App()
  new CdkStack(app, 'cloud-deployment-service')
}

bootstrap()
