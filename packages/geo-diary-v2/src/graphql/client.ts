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
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      const messageArr = message?.split('-')
      const LAST_INDEX = messageArr?.length - 1
      const messageNotIncludeTraceID = messageArr?.[LAST_INDEX]
      notification.error({
        message: messageNotIncludeTraceID,
        placement: 'bottomRight',
      })
    })
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    notification.error({
      message: networkError,
      placement: 'bottomRight',
    })
  }
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
