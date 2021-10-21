import { importSchema } from 'graphql-import'
import resolvers from './resolvers'
import depthLimit from 'graphql-depth-limit'
import * as Sentry from '@sentry/node'
import { handleContext, formatError } from './utils'
import { ApolloServerPluginLandingPageGraphQLPlayground, Config } from 'apollo-server-core'
import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

const typeDefs = importSchema('./src/schema.graphql')

export const config: Config<LambdaContextFunctionParams> = {
  typeDefs,
  resolvers,
  introspection: true,
  formatError,
  context: handleContext,
  validationRules: [depthLimit(10)],
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
}