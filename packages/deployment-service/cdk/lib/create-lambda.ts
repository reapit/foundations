import { createFunction, Function, Vpc, Stack } from '@reapit/ts-scripts/src/cdk'

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
