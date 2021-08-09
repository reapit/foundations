import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-lambda'
import { buildSchema } from 'type-graphql'
import { BookResolver } from './resolvers/BookResolver'
import { AuthorResolver } from './resolvers/AuthorResolver'

const createHandler = async () => {
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],
  })

  const server = new ApolloServer({
    schema,
  })

  return server.createHandler()
}

export const handler = async (event, context) => {
  const server = await createHandler()
  // @ts-ignore until https://github.com/apollographql/apollo-server/issues/5592 is resolved
  return server(event, context)
}
