import { createBaseStack, createSite, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'

const createStack = async () => {
  const accountId = await getAccountId()

  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'data-warehouse-app',
    component: 'site',
    accountId,
    region: 'eu-west-2',
  })

  await createSite(stack, {
    env: process.env.APP_STAGE === 'production' ? 'prod' : 'dev',
    location: join(__dirname, 'build'),
  })
}

const bootstrap = async () => {
  await createStack()
}

bootstrap()
  .then(() => {
    console.log('Site deployed successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Build error: ', err)
    process.exit(1)
  })
