import { createFunction, Function, Vpc, Stack } from '@reapit/ts-scripts/src/cdk'
import { aws_lambda as lambda } from 'aws-cdk-lib'

import config from '../../config.json'

// lambda environment is limited to 4KB total, added this to make sure we don't go near that limit
// if you have long things they should probably live in secrets
const filteredEnvironment = (obj: Record<string, any>) =>
  Object.keys(obj).reduce<Record<string, string>>((acc, key) => {
    if (key === 'ISSUERS') return acc
    if (obj[key].length < 100) {
      acc[key] = obj[key]
    } else {
      console.warn(`config item ${key} is too long, it will be excluded from env`)
    }
    return acc
  }, {})

const fe = filteredEnvironment(config)

export const createLambda = ({
  stack,
  name,
  entrypoint,
  vpc,
  handler,
  env,
  duration,
  ram,
  runtime,
}: {
  stack: Stack
  name: string
  entrypoint: string
  vpc?: Vpc
  handler: string
  env?: { [s: string]: any }
  duration?: number
  ram?: number
  runtime?: lambda.Runtime
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
    ram,
    runtime,
  )
}
