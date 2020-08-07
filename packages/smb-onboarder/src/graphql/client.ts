import ApolloClient, { InMemoryCache, Operation, defaultDataIdFromObject, IdGetterObj } from 'apollo-boost'
import { ErrorHandler, ErrorResponse } from 'apollo-link-error'
import { ApolloCache } from 'apollo-cache'
import typeDefs from './schema.graphql'
import resolvers from './resolvers'
import { notification } from '@reapit/elements'

export const generateRequest = (accessToken: string) => async (operation: Operation) => {
  operation.setContext({
    headers: {
      authorization: accessToken,
    },
  })
}

export const onError: ErrorHandler = ({ graphQLErrors, networkError }: ErrorResponse) => {
  let readableMessage
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        readableMessage = message.split('|')[1] || message
      }
    })
  }
  if (networkError) {
    readableMessage = `[Network error]: ${networkError}`
    console.log(readableMessage)
  }
  notification.error({ message: readableMessage, placement: 'bottomRight' })
}

export const dataIdFromObject = (object: IdGetterObj) => {
  // Will open when custom object ID for caching
  // switch (object.__typename) {
  //   // Custom keycache here!
  //   default:
  //     return defaultDataIdFromObject(object)
  // }
  return defaultDataIdFromObject(object)
}

const cache: ApolloCache<any> = new InMemoryCache({
  dataIdFromObject,
})

const clientState = {
  cache,
  defaults: {},
  resolvers,
  typeDefs,
}

export const getClient = (accessToken: string, uri: string) =>
  new ApolloClient({
    uri,
    onError,
    cache,
    request: generateRequest(accessToken),
    clientState,
  })

export default getClient
