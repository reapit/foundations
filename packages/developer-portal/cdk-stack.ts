import { createBaseStack, createSite, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'

const createStack = async () => {
  const accountId = await getAccountId()

  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'developers',
    component: 'site',
    accountId,
    region: 'eu-west-2',
  })

  await createSite(stack, {
    env: process.env.APP_STAGE !== 'production' ? 'dev' : 'prod',
    location: join(__dirname, 'build'),
  })
}

const bootstrap = async () => {
  await createStack()
}

bootstrap()
