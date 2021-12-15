import { createFunction, Function } from '@reapit/ts-scripts/src/cdk/components/lambda-function'
import { Vpc } from '@reapit/ts-scripts/src/cdk/components/vpc-network'
import { Stack } from '@reapit/ts-scripts/src/cdk/components/stack'

import environment from '../../config.json'

export const createLambda = ({
  stack,
  name,
  entrypoint,
  vpc,
  handler,
  env,
}: {
  stack: Stack
  name: string
  entrypoint: string
  vpc?: Vpc
  handler: string
  env?: { [s: string]: any }
}): Function => {
  return createFunction(
    stack,
    name,
    entrypoint,
    handler,
    {
      ...environment,
      ...env,
    },
    vpc,
  )
}
