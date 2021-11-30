#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { createStack } from './stack'

const namespace = 'cloud'
const appName = 'foundations'
const component = 'graphql-server'
const name = `${namespace}-${appName}-${component}`

const app = new cdk.App()
createStack(app, name)
