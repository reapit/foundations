import { ApolloClient, InMemoryCache, defaultDataIdFromObject, HttpLink, StoreObject, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import typeDefs from './schema.graphql'
import resolvers from './resolvers'
import { notification } from '@reapit/elements-legacy'
import { logger } from '@reapit/utils'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      const messageArr = message?.split('-')
      const LAST_INDEX = messageArr?.length - 1
      const messageNotIncludeTraceID = messageArr?.[LAST_INDEX]
      notification.error({
        message: messageNotIncludeTraceID,
      })
    })
    graphQLErrors.forEach((error) => logger(error))
  }
  if (networkError) {
    notification.error({
      message: `Network Error: ${networkError.message}`,
    })
    logger(networkError)
  }
})

export const dataIdFromObject = (object: Readonly<StoreObject>) => {
  return defaultDataIdFromObject(object)
}

const httpLink = new HttpLink({
  uri: window.reapit.config.graphqlUri,
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
      'reapit-customer': `${loginIdentity.clientId}-${loginIdentity.userCode}`,
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
