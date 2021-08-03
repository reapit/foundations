#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { createStack } from './stack'

const namespace = 'reapit'
const appName = 'foundations'
const component = 'app-builder-backend'
const name = `${namespace}-${appName}-${component}`

const app = new cdk.App()
createStack(app, name)
