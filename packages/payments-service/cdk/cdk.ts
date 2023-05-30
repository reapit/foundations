#!/usr/bin/env node
import 'source-map-support/register'
import { createStack } from './cdk-stack'

import { execSync } from 'child_process'

const bootstrap = async () => {
  execSync('yarn build', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  await createStack()
}

bootstrap()
  .catch(error => console.error(error))
