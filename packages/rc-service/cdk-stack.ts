import { createBaseStack, createMultiRegionSite, createSite, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'

const createStack = async () => {
  const isProd = process.env.APP_STAGE === 'production'
  const accountId = await getAccountId()
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'rc-service',
    component: 'site',
    accountId,
    region: 'eu-west-2',
    crossRegionReferences: isProd,
  })

  // Remove prod check when we go live in ANZ
  if (isProd) {
    await createSite(stack, {
      env: 'prod',
      location: join(__dirname, 'build'),
    })
  } else {
    await createMultiRegionSite(stack, {
      env: 'dev',
      location: join(__dirname, 'build'),
    })
  }
}

const bootstrap = async () => {
  await createStack()
}

bootstrap().catch((err) => {
  console.error('Build error: ', err)
  process.exit(1)
})
