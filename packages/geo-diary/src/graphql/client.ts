import { ApolloClient, InMemoryCache, defaultDataIdFromObject, HttpLink, StoreObject, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import typeDefs from './schema.graphql'
import resolvers from './resolvers'
import { logger } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors.length) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const messageArr = message?.split('-')
      const LAST_INDEX = messageArr?.length - 1
      const messageNotIncludingTraceID = messageArr?.[LAST_INDEX]
      const errorMessage = `Message: ${message}, Location: ${locations}, Path: ${path}, Error: ${messageNotIncludingTraceID}`

      logger(new Error(errorMessage))
    })
  }

  if (networkError) {
    logger(networkError)
  }
})

export const dataIdFromObject = (object: Readonly<StoreObject>) => {
  return defaultDataIdFromObject(object)
}

const httpLink = new HttpLink({
  uri: process.env.graphqlUri,
})

const authLink = setContext(async (_, { headers }) => {
  const session = await reapitConnectBrowserSession.connectSession()

  if (!session) {
    return headers
  }

  const { accessToken, idToken, loginIdentity } = session

  return {
    headers: {
      ...headers,
      authorization: idToken,
      'reapit-connect-token': `Bearer ${accessToken}`,
      'reapit-customer': loginIdentity.clientId,
    },
  }
})

export const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({
    dataIdFromObject,
  }),
  resolvers,
  typeDefs,
  link: from([authLink, errorLink, httpLink]),
})

export default client
