import { createBaseStack, createSite, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'
import { createSecurityHeaderLambdaStack } from '@reapit/security-header-lambda/cdk-stack'

const createStack = async () => {
  const accountId = await getAccountId()
  const { edgeLambda } = await createSecurityHeaderLambdaStack()

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
    edgeLambda,
  })
}

const bootstrap = async () => {
  await createStack()
}

bootstrap().catch((err) => {
  console.error('Build error: ', err)
  process.exit(1)
})
