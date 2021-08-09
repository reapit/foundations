import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { BookResolver } from './resolvers/book-resolver'
import { AuthorResolver } from './resolvers/author-resolver'

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
