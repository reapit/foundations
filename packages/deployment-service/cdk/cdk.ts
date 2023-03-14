#!/usr/bin/env node
import 'source-map-support/register'
import { createStack } from './lib/cdk-stack'

import { execSync } from 'child_process'

const bootstrap = async () => {
  execSync('yarn build', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  execSync('yarn bundle', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  await createStack()
}

bootstrap()
