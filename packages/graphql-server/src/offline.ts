import { ApolloServer, Config } from 'apollo-server'
import { config } from './graphql-common'
import { headersToContext } from './utils'

const server = new ApolloServer({
  ...config,
  plugins: undefined,
  context: ({ req }) => {
    return headersToContext(req.headers, {})
  },
} as Config)

server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})