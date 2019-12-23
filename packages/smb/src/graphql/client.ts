import ApolloClient, { InMemoryCache, Operation, defaultDataIdFromObject, IdGetterObj } from 'apollo-boost'
import { ErrorHandler, ErrorResponse } from 'apollo-link-error'
import { ApolloCache } from 'apollo-cache'
import typeDefs from '../types/schema.graphql'
import resolvers from './resolvers'

// hard-code token.
const token =
  'eyJraWQiOiI3UzdmUGRlcFdpN3FvdFhsK3o3NWlWQlJhcTE2UmhsTmNqQVhpR21Ta3BZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjOTBlZjQ5Yy05OWYwLTRjYWYtOGE5NS05OTQxNDkzMTg2NTciLCJldmVudF9pZCI6IjE3MzQ5M2I2LWI0ZTYtNGIzNC04ZDUwLTBhNmFiMjBlMTc0OCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzY3NTI0NjYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX2hidDBCN3l5cyIsImV4cCI6MTU3Njc1NjA2NiwiaWF0IjoxNTc2NzUyNDY2LCJqdGkiOiI2OGNjNjJlMS1mOWYzLTRjMGYtOGZlMy1hZWEzYmQ0YWYwNDYiLCJjbGllbnRfaWQiOiI2NzJncnN2aTMycjNmc2QyZmlxaTltcGdxOSIsInVzZXJuYW1lIjoiYzkwZWY0OWMtOTlmMC00Y2FmLThhOTUtOTk0MTQ5MzE4NjU3In0.lhBI7g6b6BZTi0RU00uz5teSk-0fOZMrOJSkVsrF1nShwzMFAzBXCOfWA1-LAFcrEtsCl7IC0Fj-qRyCJDUbEfdYqDBDz-A6e0o1n7J5HjS1i426kWvgWi_7-MX4ZtM6DDAZJQmbwOGLu-WThU_3rK1YQXq1dJRbgi9XHARyvLWsV7CSRGTcU4axz00fIpZ4W79ve5NQbjy_U1CmBmJn4x0Zpyo0fWKhFHn40Kf_gfU5S1DPiKRleRZrtLKs2awG741oVXrVwP5ywug2KgxLWERNnA0tNfjYVxxuw5k5u0XywBk5hscZA4a70Xerer2LjA91HLuotsO4fnp8xia6bw'

export const request = async (operation: Operation) => {
  // TODO implement later
  // const authorization = localStorage.getItem('token')
  operation.setContext({
    headers: {
      authorization: token,
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
  resolvers,
  typeDefs,
}

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  onError,
  cache,
  request,
  clientState,
})

export default client
