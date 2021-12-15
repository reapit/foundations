#!/usr/bin/env node
import 'source-map-support/register'
import { createStack } from './lib/cdk-stack'
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

  createStack()
}

bootstrap()
