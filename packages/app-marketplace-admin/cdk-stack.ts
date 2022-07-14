import { execSync } from 'child_process'
import { createBaseStack, createSite } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'
import config from './config.json'

const createStack = async () => {
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'app-marketplace-admin',
    component: 'site',
    accountId: config.awsAccountId,
    region: 'eu-west-2',
  })

  await createSite(stack, {
    env: 'dev',
    location: join(__dirname, 'public', 'dist'),
  })
}

const bootstrap = async () => {
  execSync('yarn build', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  await createStack()
}

bootstrap()
