import { buildSchema } from 'type-graphql'
import { AppResolver } from './resolvers/app-resolver'
import { AuthorResolver } from './resolvers/author-resolver'
import { BookResolver } from './resolvers/book-resolver'
import { PropertyResolver } from './resolvers/property-resolver'

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver, AppResolver, PropertyResolver],
  })
  return schema
}
