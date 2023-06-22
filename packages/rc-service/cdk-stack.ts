import { createBaseStack, createMultiRegionSite, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'

const createStack = async () => {
  const accountId = await getAccountId()
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'rc-service',
    component: 'site',
    accountId,
    region: 'eu-west-2',
    crossRegionReferences: true,
  })

  await createMultiRegionSite(stack, {
    env: process.env.APP_STAGE === 'production' ? 'prod' : 'dev',
    location: join(__dirname, 'build'),
    onlyZone: true,
  })
}

const bootstrap = async () => {
  await createStack()
}

bootstrap().catch((err) => {
  console.error('Build error: ', err)
  process.exit(1)
})
