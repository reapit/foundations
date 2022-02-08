import 'reflect-metadata'
import { APIGatewayEvent } from 'aws-lambda'

import { Context } from './types'
import { getSchema } from './get-schema'
import { ExtendedApolloServerLambda } from './extended-apollo-server'
import { getMetadataSchemas } from './platform'

const lowerCaseKeys = (obj: Record<string, string | undefined>): Record<string, string> => {
  const newObj = {}
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      newObj[key.toLowerCase()] = obj[key]
    }
  })
  return newObj
}

const createHandler = async (event: APIGatewayEvent) => {
  const lowercaseHeaders = lowerCaseKeys(event.headers)
  const { authorization } = lowercaseHeaders
  const apiUrl = `https://${event.headers.Host}/${event.requestContext.stage}/`
  if (!authorization) {
    throw new Error('Must have the authorization header')
  }
  const accessToken = lowercaseHeaders['reapit-connect-token'] as string
  const context: Context = {
    apiUrl,
    idToken: authorization?.split(' ')[1],
    accessToken,
    metadataSchemas: await getMetadataSchemas(accessToken).catch(() => []),
  }
  const server = new ExtendedApolloServerLambda({
    schema: await getSchema(),
    context,
    schemaCallback: () => getSchema(context),
  })

  return server.createHandler()
}

export const handler = async (event: APIGatewayEvent, context) => {
  const server = await createHandler(event)
  // @ts-ignore until https://github.com/apollographql/apollo-server/issues/5592 is resolved
  return server(event, context)
}
