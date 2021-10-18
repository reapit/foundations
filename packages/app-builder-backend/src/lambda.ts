import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-lambda'
import { APIGatewayEvent } from 'aws-lambda'

import { Context } from './types'
import { getSchema } from './get-schema'

const lowerCaseKeys = (obj: Record<string, string | undefined>): Record<string, string> => {
  const newObj = {}
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      newObj[key.toLowerCase()] = obj[key]
    }
  })
  return newObj
}

const createHandler = async () => {
  const schema = await getSchema()

  const server = new ApolloServer({
    schema,
    context: ({ event }: { event: APIGatewayEvent }): Context => {
      const lowercaseHeaders = lowerCaseKeys(event.headers)
      const { authorization } = lowercaseHeaders
      const apiUrl = `https://${event.headers.Host}/${event.requestContext.stage}/`
      if (!authorization) {
        throw new Error('Must have the authorization header')
      }
      return {
        apiUrl,
        idToken: authorization?.split(' ')[1],
        accessToken: lowercaseHeaders['reapit-connect-token'] as string,
      }
    },
  })

  return server.createHandler()
}

export const handler = async (event: APIGatewayEvent, context) => {
  const server = await createHandler()
  // @ts-ignore until https://github.com/apollographql/apollo-server/issues/5592 is resolved
  return server(event, context)
}
