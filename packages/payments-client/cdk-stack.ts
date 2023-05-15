import { createBaseStack, createSite, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'
import { getSecurityLambdaOutputs } from '@reapit/security-header-lambda/cdk'

const createStack = async () => {
  const accountId = await getAccountId()
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'payments',
    component: 'site',
    accountId,
    region: 'eu-west-2',
  })
  const securityHeaderLambda = getSecurityLambdaOutputs()

  await createSite(stack, {
    env: process.env.APP_STAGE === 'production' ? 'prod' : 'dev',
    location: join(__dirname, 'build'),
    securityHeaderLambda,
  })
}

const bootstrap = async () => {
  await createStack()
}

bootstrap().catch((err) => {
  console.error('Build error: ', err)
  process.exit(1)
})
