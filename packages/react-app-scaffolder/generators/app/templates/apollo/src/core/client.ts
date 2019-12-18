import ApolloClient, { InMemoryCache, Operation, defaultDataIdFromObject, IdGetterObj } from 'apollo-boost'
import { ErrorHandler, ErrorResponse } from 'apollo-link-error'
import { ApolloCache } from 'apollo-cache'

export const request = async (operation: Operation) => {
  // TODO implement later
  const authorization = localStorage.getItem('token')
  operation.setContext({
    headers: {
      authorization,
    },
  })
}

export const onError: ErrorHandler = ({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
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
  resolvers: {},
  typeDefs: '',
}

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  onError,
  cache,
  request,
  clientState,
})

export default client
