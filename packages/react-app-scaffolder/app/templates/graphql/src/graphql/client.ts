import ApolloClient, { InMemoryCache, Operation, defaultDataIdFromObject, IdGetterObj } from 'apollo-boost'
import { ErrorHandler, ErrorResponse } from 'apollo-link-error'
import { ApolloCache } from 'apollo-cache'
import { notification } from '@reapit/elements-legacy'

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
      })
    })
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    notification.error({
      message: networkError,
    })
  }
}

export const dataIdFromObject = (object: IdGetterObj) => {
  return defaultDataIdFromObject(object)
}

const cache: ApolloCache<any> = new InMemoryCache({
  dataIdFromObject,
})

export const getClient = (accessToken: string, uri: string) =>
  new ApolloClient({
    uri,
    onError,
    cache,
    request: generateRequest(accessToken),
  })

export default getClient
