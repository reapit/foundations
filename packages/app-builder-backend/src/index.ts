import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { BookResolver } from './resolvers/BookResolver'
import { AuthorResolver } from './resolvers/AuthorResolver'

const start = async () => {
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],
  })

  const server = new ApolloServer({
    schema,
  })
  const { url } = await server.listen()
  console.log(`GraphQL Server is listening at ${url}`)
}

start().catch(console.error)
