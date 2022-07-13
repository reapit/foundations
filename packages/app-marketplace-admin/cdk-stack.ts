import { execSync } from 'child_process'
import { createBaseStack, createSite } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'
import config from './config.json'

const createStack = async () => {
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'app-marketplace-admin',
    component: 'site',
  })

  const domain = config.domain
  const hostedZoneId = config.hostedZoneId
  const sslCertArn = config.sslCertArn

  createSite(stack, {
    domain,
    hostedZoneId,
    location: join(__dirname, 'public', 'dist'),
    sslCertArn,
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
