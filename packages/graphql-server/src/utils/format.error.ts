import { GraphQLError, GraphQLFormattedError } from "graphql"

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (process.env.NODE_ENV === 'production') {
    return { message: error.message, extensions: { code: error.extensions?.code } }
  }
  return error
}
