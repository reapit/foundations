#!/usr/bin/env node
import 'source-map-support/register'
import { createStack } from './lib/cdk-stack'

const bootstrap = async () => {
  createStack()
}

bootstrap()
