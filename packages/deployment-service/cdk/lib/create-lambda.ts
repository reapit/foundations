import { createFunction, Function, Vpc, Stack } from '@reapit/ts-scripts/src/cdk'

import environment from '../../config.json'

// lambda environment is limited to 4KB total, added this to make sure we don't go near that limit
// if you have long things they should probably live in secrets
const filteredEnvironment = (obj: Record<string, string>) => {
  const env = Object.keys(obj).reduce<Record<string, string>>((acc, key) => {
    if (obj[key].length < 100) {
      acc[key] = obj[key]
    } else {
      console.warn(`config item ${key} is too long, it will be excluded from env`)
    }
    return acc
  }, {})
  return env
}

const fe = filteredEnvironment(environment)

export const createLambda = ({
  stack,
  name,
  entrypoint,
  vpc,
  handler,
  env,
  duration,
}: {
  stack: Stack
  name: string
  entrypoint: string
  vpc?: Vpc
  handler: string
  env?: { [s: string]: any }
  duration?: number
}): Function => {
  return createFunction(
    stack,
    name,
    entrypoint,
    handler,
    {
      ...fe,
      ...env,
    },
    vpc,
    duration,
  )
}
