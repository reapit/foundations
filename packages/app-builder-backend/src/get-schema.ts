import { buildSchema } from 'type-graphql'
import { AppResolver } from './resolvers/app-resolver'
import { AuthorResolver } from './resolvers/author-resolver'
import { BookResolver } from './resolvers/book-resolver'
import { ContactResolver } from './resolvers/contact-resolver'
import { KeyResolver } from './resolvers/key-resolver'
import { NegotiatorResolver } from './resolvers/negotiator-resolver'
import { PropertyResolver } from './resolvers/property-resolver'
import { customAuthChecker } from './utils/auth-checker'

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [
      BookResolver,
      AuthorResolver,
      AppResolver,
      PropertyResolver,
      KeyResolver,
      ContactResolver,
      NegotiatorResolver,
    ],
    authChecker: customAuthChecker,
  })
  return schema
}
